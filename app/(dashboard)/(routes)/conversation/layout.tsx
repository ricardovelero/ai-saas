import React from "react";
import getConversations from "@/app/actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <div>
      <ConversationList title="Conversations" initialItems={conversations} />
      {children}
    </div>
  );
}
