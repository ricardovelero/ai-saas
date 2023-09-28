"use client";

import { useState } from "react";
import { Conversation } from "@prisma/client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Menu from "./Menu";

type HeaderProps = {
  conversation: Conversation;
};

export default function Header({ conversation }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center bg-white w-full border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href={"/conversation"}
            className="lg:hidden block text-gray-600 transition cursor-pointer"
          >
            <ChevronLeft size={32} />
          </Link>
        </div>
        <Menu conversation={conversation} />
      </div>
    </>
  );
}
