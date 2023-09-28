import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    // Checks
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const conversation = await prisma.conversation.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
