import { countGenerationsSince, utcMonthStart } from "@/db/generations";
import { HuggingFaceImageModel } from "@/lib/ai-image-models";
import { hf } from "@/lib/aiSetup";
import { getMonthlyGenerationLimit } from "@/lib/generation-quota";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId, has } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
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

        const body = await req.json();
        const { prompt, model } = body;

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!model) {
            return new NextResponse("Valid AI model is required", { status: 400 });
        }

        const hfResponse: any = await hf.textToImage({
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
        });

        if (!hfResponse) {
            return NextResponse.json({ error: "The model did not return an image." }, { status: 502 });
        }
        if (!(hfResponse instanceof Blob)) {
            throw new Error("Invalid response from the AI API.");
        }

        const arrayBuffer = await hfResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const dataUrl = `data:${hfResponse.type};base64,${buffer.toString("base64")}`;

        // const generation = await saveGeneration({
        //     userId,
        //     prompt: prompt,
        //     model: model,
        //     imageUrl: dataUrl,
        //     style: 'text-to-image'
        // });

        // return NextResponse.json({
        //     id: generation.id,
        //     imageUrl: dataUrl
        // });

    } catch (error: any) {
        console.error("prompt-to-image api error");
        if (error instanceof Error && error.message.includes("is currently loading")) {
            return new NextResponse(
                "The model is currently loading, please try again in a moment.",
                { status: 503 },
            );
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}