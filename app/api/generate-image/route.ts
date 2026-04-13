
import { countGenerationsSince, createGeneration, utcMonthStart } from "@/db/generations";
import { getMonthlyGenerationLimit } from "@/lib/generation-quota";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { hf } from "@/lib/aiSetup";
import { ACCEPTED_SOURCE_IMAGE_MIME_TYPES } from "@/lib/constants";
import { getStylePreset } from "@/lib/style-presets";

import { uploadBufferToImageKit } from "@/lib/imagekit";
import sharp from "sharp";

export const runtime = "nodejs";

type GenerateImageRequest = {
    sourceImageUrl?: string;
    sourceMimeType?: string;
    originalFileName?: string;
    styleSlug?: string;
    model?: string;
};

type EditImageSize = "1024x1024" | "1536x1024" | "1024x1536";

async function inferImageSize(imageBuffer: Buffer): Promise<EditImageSize> {
    try {
        const metadata = await sharp(imageBuffer).metadata();

        if (!metadata.width || !metadata.height) {
            return "1024x1024";
        }

        const aspectRatio = metadata.width / metadata.height;

        if (aspectRatio > 1.08) return "1536x1024"; // this means that the input image is wider than it is tall
        if (aspectRatio < 0.92) return "1024x1536"; // this means that the input image is taller than it is wide
        return "1024x1024"; // this means that the input image is square
    } catch {
        return "1024x1024";
    }
}

export async function POST(request: Request) {
    const { userId, has } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const monthlyLimit = getMonthlyGenerationLimit(has);
    const usedThisMonth = await countGenerationsSince(userId, utcMonthStart());

    if (usedThisMonth >= monthlyLimit) {
        return NextResponse.json(
            {
                error: `Monthly generation limit reached (${monthlyLimit} images). Upgrade your plan or try again next month.`,
                code: "QUOTA_EXCEEDED" as const,
                limit: monthlyLimit,
                used: usedThisMonth,
            },
            { status: 429 },
        );
    }

    if (!hf) {
        return NextResponse.json({ error: "Missing HUGGING_FACE_API_KEY." }, { status: 500 });
    }

    const body = (await request.json()) as GenerateImageRequest;

    const { model, originalFileName, sourceImageUrl, sourceMimeType, styleSlug } = body;

    if (!sourceImageUrl) {
        return NextResponse.json({ error: "Please upload an image first." }, { status: 400 });
    }

    if (typeof sourceMimeType !== "string" || !ACCEPTED_SOURCE_IMAGE_MIME_TYPES.has(sourceMimeType)) {
        return NextResponse.json(
            { error: "Only JPG, PNG, and WEBP files are supported." },
            { status: 400 },
        );
    }

    if (typeof styleSlug !== "string") {
        return NextResponse.json({ error: "Please choose a style." }, { status: 400 });
    }

    if (!model) {
        return NextResponse.json({ error: "Please choose a model." }, { status: 400 });
    }

    const preset = getStylePreset(styleSlug);
    if (!preset) {
        return NextResponse.json({ error: "Unknown style preset." }, { status: 400 });
    }

    const imageResponse = await fetch(sourceImageUrl);
    if (!imageResponse.ok) {
        return NextResponse.json(
            { error: "Could not fetch the uploaded source image." },
            { status: 404 },
        );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    const prompt = [
        preset.prompt,
        "Do not add extra people, extra limbs, duplicate subjects, or change the overall camera angle.",
    ].join("\n\n");

    try {
        const imageBlob = new Blob([imageBuffer], { type: sourceMimeType! });

        const resultImageBlob = await hf.imageToImage({
            model: model!,
            inputs: imageBlob,
            parameters: {
                prompt: prompt,
            },
        });

        if (!resultImageBlob) {
            return NextResponse.json({ error: "The model did not return an image." }, { status: 502 });
        }

        const resultBuffer = Buffer.from(await resultImageBlob.arrayBuffer());
        const imageBase64 = resultBuffer.toString("base64");

        const { url: resultImageUrl } = await uploadBufferToImageKit({
            buffer: resultBuffer,
            fileName: `${preset.slug}-result.png`,
            folder: `/users/${userId}/results`,
            mimeType: "image/png",
        });

        const savedGeneration = await createGeneration({
            clerkUserId: userId,
            originalFileName: typeof originalFileName === "string" ? originalFileName : null,
            sourceImageUrl,
            resultImageUrl,
            styleSlug: preset.slug,
            styleLabel: preset.label,
            model,
            promptUsed: prompt,
        });

        return NextResponse.json({
            imageBase64,
            mimeType: "image/png",
            promptUsed: prompt,
            style: { slug: preset.slug, label: preset.label },
            model,
            savedGeneration,
        });
    } catch (error) {
        console.error("generate-image route failed", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message || "Image generation failed. Please try again." },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { error: "Image generation failed. Please try again." },
            { status: 500 },
        );
    }
}
