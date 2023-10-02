"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, MessageSquarePlus } from "lucide-react";
import { Conversation } from "@prisma/client";
import useConversations from "@/hooks/useConversations";
import useConversation from "@/hooks/useConversation";
import ConversationBox from "./ConversationBox";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

type ConversationListProps = {
  title?: string;
};

export default function ConversationList({ title }: ConversationListProps) {
  const router = useRouter();

  const { conversations, isLoading, isError } = useConversations();

  const { conversationId } = useConversation();
  // Temporary
  let isOpen = true;

  if (isError) {
    return (
      <aside
        className={cn(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-70 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        {" "}
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <ErrorComponent />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-70 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">{title}</div>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MessageSquarePlus size={20} onClick={() => {}} />
          </div>
        </div>
        {isLoading && <LoadingComponent />}
        {!isLoading &&
          conversations.map((item: Conversation) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
      </div>
    </aside>
  );
}
