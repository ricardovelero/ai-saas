import React from "react";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const conversations = await getConversations();

  return (
    <div>
      <ConversationList title="Conversations" />
      {children}
    </div>
  );
}
