import React from "react";
import getConversationById from "@/app/actions/getConversationById";
import Empty from "@/components/empty";
import Body from "./components/Body";
import Prompt from "@/components/prompt";
import Header from "./components/Header";

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
              <Header conversation={conversation} />
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
