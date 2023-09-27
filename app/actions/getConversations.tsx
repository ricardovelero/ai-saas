import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function getConversations() {
  const { userId } = auth();

  if (!userId) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userId,
      },
      include: {
        messages: true,
      },
    });
    return conversations;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
