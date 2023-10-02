import React from "react";
import Empty from "@/components/empty";
import Body from "./components/Body";
import Prompt from "@/components/prompt";
import Header from "./components/Header";
import useSWR from "swr";
import { fetcher } from "@/lib/swrRequests";

type IParams = {
  conversationId: string;
};

export default function ConversationPage({ params }: { params: IParams }) {
  const {
    data: conversation,
    error: isError,
    isLoading,
  } = useSWR(`/api/conversations/${params.conversationId}`, fetcher);

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
