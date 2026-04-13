import { auth } from "@clerk/nextjs/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {

    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({})
    }

    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    })

    return NextResponse.json({
        token,
        expire,
        signature,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

}