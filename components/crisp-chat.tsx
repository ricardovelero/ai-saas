"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("ea2e7b08-fb53-4479-b003-6f772ac5ed0b");
  }, []);

  return null;
}
