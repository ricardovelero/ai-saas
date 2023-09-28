import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function createConversation() {
  const { userId } = auth();

  if (!userId) return [];

  try {
    const conversation = await prisma.conversation.create({
      data: {
        userId,
      },
    });
    return conversation;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
