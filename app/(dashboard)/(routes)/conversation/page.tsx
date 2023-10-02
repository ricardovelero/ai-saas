"use client";

import clsx from "clsx";

import useConversation from "@/hooks/useConversation";
import Prompt from "@/components/prompt";

export default function ConversationsHome() {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <Prompt />
    </div>
  );
}
