"use client";

import React, { useRef } from "react";
import { Message } from "@prisma/client";
import MessageBox from "./MessageBox";
import useSWR from "swr";
import { fetcher } from "@/lib/swrRequests";
import { useParams } from "next/navigation";
import Loader from "@/components/loader";
import Error from "@/components/ErrorComponent";

export default function Body() {
  const { conversationId } = useParams();

  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: conversation,
    error: isError,
    isLoading,
  } = useSWR(`/api/conversation/${conversationId}`, fetcher);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 lg:space-y-8 lg:p-8">
      {conversation.messages?.map((message: Message, i: number) => (
        <MessageBox
          isLast={i === conversation.messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
