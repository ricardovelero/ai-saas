"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import ContextMenu from "./Menu";

type ConversationBoxProps = {
  data: any;
  selected?: boolean;
};

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) return lastMessage?.body;

    return "Empty conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex items-center w-full space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between mb-1">
            <p className="text-md font-medium text-gray-900">{data.name}</p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}{" "}
            <ContextMenu conversation={data} />
          </div>
          <p className="truncate text-sm text-black font-medium">
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
