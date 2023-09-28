import React from "react";
import getConversationById from "@/app/actions/getConversationById";
import Empty from "@/components/empty";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import Body from "./components/Body";
import Prompt from "@/components/prompt";

type IParams = {
  conversationId: string;
};

export default async function ConversationPage({
  params,
}: {
  params: IParams;
}) {
  const conversation = await getConversationById(params.conversationId);
  // const messages = await getMessages(params.conversationId);

  return (
    <>
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          {conversation ? (
            <>
              <Heading
                title="Conversation"
                description="An advanced conversation model. Uses GPT-4 from OpenAI."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
              />
              <Body initialMessages={conversation.messages} />
              <Prompt />
            </>
          ) : (
            <Empty label="No conversation started." />
          )}
        </div>
      </div>
    </>
  );
}
