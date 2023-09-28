import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import prisma from "@/lib/prismadb";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface IParams {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const conversationId = params.conversationId;
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    // Checks
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!configuration.apiKey)
      return new NextResponse("Open AI Key not configured", { status: 500 });

    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    console.log("Checking messages", messages);

    const newUserMessage = await prisma.message.create({
      data: {
        userId,
        role: messages[0].role,
        body: messages[0].content,
        conversation: {
          connect: { id: conversationId },
        },
      },
    });

    console.log("New User Message", newUserMessage);

    // Call OpenAI
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    const newMessage = await prisma.message.create({
      data: {
        userId,
        role: "bot",
        body: response.data.choices[0].message?.content,
        conversation: {
          connect: { id: conversationId },
        },
      },
    });

    console.log(newMessage);

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[MESSAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
