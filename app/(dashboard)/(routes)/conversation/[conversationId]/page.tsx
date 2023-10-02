import React from "react";
import Empty from "@/components/empty";
import Body from "./components/Body";
import Prompt from "@/components/prompt";
import Header from "./components/Header";

type IParams = {
  conversationId: string;
};

export default function ConversationPage({ params }: { params: IParams }) {
  return (
    <>
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Header />
          <Body />
          <Prompt />
        </div>
      </div>
    </>
  );
}
