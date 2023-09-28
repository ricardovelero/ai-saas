import React from "react";
import createConversation from "@/app/actions/createConversation";
import getConversations from "@/app/actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  console.log("Conversations Length:", conversations.length);

  if (!conversations.length) {
    const newConversation = await createConversation();
    console.log("New Conversation created", newConversation);
  }
  return (
    <div>
      <ConversationList title="Conversations" initialItems={conversations} />
      {children}
    </div>
  );
}
