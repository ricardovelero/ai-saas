import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { rateLimit } from "@/lib/rate-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const identifier = req.url + "-" + userId;
    const { success } = await rateLimit(identifier);

    if (!success)
      return new NextResponse("Rate limit exceeded", { status: 429 });

    if (!configuration.apiKey)
      return new NextResponse("Open AI Key not configured", { status: 500 });

    if (!messages)
      return new NextResponse("Messages are required", { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 });

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
