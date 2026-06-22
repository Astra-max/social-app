"use client"

import ChatSideBar from "@/components/chats/ChatSideBar";
import { usePathname } from "next/navigation";
import { NewChat } from "@/components/chats/messages";


export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname()

  if (path === "/view/Messages") {
    return (
    <div className="flex gap-3">
      <ChatSideBar />
      <NewChat />
    </div>
  );
  }

  return (
    <div className="flex gap-3">
      <ChatSideBar />
      {children}
    </div>
  );
}