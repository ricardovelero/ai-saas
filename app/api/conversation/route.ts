import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Conversation } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const conversations: Conversation[] = await prisma.conversation.findMany({
      include: {
        messages: true,
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("[CONVERSATIONS GET ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
