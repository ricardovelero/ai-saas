"use client";

import React, { useRef } from "react";
import { Message } from "@prisma/client";
import MessageBox from "./MessageBox";

type BodyProps = {
  initialMessages?: Message[];
};

export default function Body({ initialMessages }: BodyProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex-1 overflow-y-auto">
      {initialMessages?.map((message, i) => (
        <MessageBox
          isLast={i === initialMessages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
