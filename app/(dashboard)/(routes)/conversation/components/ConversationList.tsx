"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import ConversationBox from "./ConversationBox";
import { Conversation } from "@prisma/client";

type ConversationListProps = {
  title?: string;
  initialItems: Conversation[];
};

export default function ConversationList({
  title,
  initialItems,
}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const isOpen = true;

  let conversationId = "65144a30a9c2652be6f04a9d";

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
            <MessageSquarePlus size={20} />
          </div>
        </div>
        {items.map((item) => (
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
