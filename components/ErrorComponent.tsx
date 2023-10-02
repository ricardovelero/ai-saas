import React from "react";

export default function Error() {
  return (
    <div className="flex justify-center items-center space-x-4 animate-pulse text-red-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
        <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
        <path d="M6 6h.01" />
        <path d="M6 18h.01" />
        <path d="m13 6-4 6h6l-4 6" />
      </svg>
      <p className="text-sm">Something went wrong...</p>
    </div>
  );
}
