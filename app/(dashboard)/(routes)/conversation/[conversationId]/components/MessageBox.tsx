import React from "react";
import { Message } from "@prisma/client";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

type MessageBoxProps = {
  isLast?: boolean;
  data: Message;
};

export default function MessageBox({ isLast, data }: MessageBoxProps) {
  return (
    <div
      key={data.body}
      className={cn(
        "p-8 w-full flex items-start gap-x-8 rounded-lg",
        data.role === "user" ? "bg-white border border-black/10" : "bg-muted"
      )}
    >
      {data.role === "user" ? <UserAvatar /> : <BotAvatar />}
      <p className="text-sm whitespace-pre">{data.body}</p>
    </div>
  );
}
