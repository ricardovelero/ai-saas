import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function getConversationById(conversationId: string) {
  try {
    const { userId } = auth();
    if (!userId) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: true,
      },
    });

    return conversation;
  } catch (error) {
    console.log(error);
    return null;
  }
}
