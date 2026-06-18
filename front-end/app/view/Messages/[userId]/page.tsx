"use client";

import { suggestedFollows } from "@/libs/dummy";
import { useParams, usePathname } from "next/navigation";
import ChatContentLayout from "@/components/chats/chatContentLayout";
import useSocket, { SocketType } from "@/hooks/useSocket";
import loadEnvFile from "@/config/config";
import { NewChat } from "@/components/chats/messages";


export default function ChatUser() {
  const { userId } = useParams();
  const pathname = usePathname();

  const config = loadEnvFile({urlType: "socket-url", urlUsage: "chat"})

  if (!config.sockectUrl || !userId) return null
  
  const {connected, messages, sendMessage}: SocketType = useSocket(config.sockectUrl, String(userId));

  if (pathname === "/view/Messages") {
    return <NewChat />;
  }

  const data = suggestedFollows.find(
    (user) => user.userId === Number(userId)
  );

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        User not found
      </div>
    );
  }

  return <ChatContentLayout
  data={data}
  messages={messages}
  connected={connected}
  sendMessage={sendMessage}
  />;
}

