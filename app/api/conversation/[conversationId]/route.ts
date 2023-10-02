import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

interface IParams {
  conversationId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const { userId } = auth();

    if (!userId) return NextResponse.json(null);

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId,
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
