"use client";

import UserProfileImage from "@/components/header/profile/userProfile";
import { suggestedFollows } from "@/libs/dummy";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Video, MoreVertical } from "lucide-react";
import { ChatContentLayout } from "../layout";
import useSocket, { SocketType } from "@/hooks/useSocket";
import loadEnvFile from "@/config/config";
import { ChatMessages } from "@/types";

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

interface UserProfile {
  userProfileImage: string;
  fullName: string;
}


export function SingleUserChatProfile({
  data,
}: {
  data: UserProfile;
}) {
  return (
    <header className="h-20 bg-[#222222] border-b border-[#333] px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserProfileImage url={data.userProfileImage} />

        <div>
          <p className="font-bold text-lg">{data.fullName}</p>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      <div className="flex gap-6">
        <Phone
          className="cursor-pointer hover:text-(--primary-theme)"
          size={20}
        />

        <Video
          className="cursor-pointer hover:text-(--primary-theme)"
          size={20}
        />

        <MoreVertical
          className="cursor-pointer hover:text-(--primary-theme)"
          size={20}
        />
      </div>
    </header>
  );
}

export function Messages( { messages }: { messages: ChatMessages[]}) {
  const { userId } = useParams();
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => <MessageBubble key={msg.messageId} text={msg.content} sender={msg.senderId === Number(userId)} />)}
    </div>
  );
}

interface BubbleProps {
  text: string;
  sender: boolean;
}

export function MessageBubble({
  text,
  sender,
}: BubbleProps) {
  return (
    <div
      className={`max-w-[60%] px-4 py-3 rounded-2xl ${
        sender
          ? "self-end bg-(--primary-theme) text-black"
          : "self-start bg-[#2c2c2c]"
      }`}
    >
      {text}
    </div>
  );
}

export function NewChat() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/chat.svg"
          alt="new chat"
          width={180}
          height={180}
        />

        <p className="text-3xl font-bold text-gray-300">
          Start a Conversation
        </p>

        <p className="text-gray-500">
          Select a friend from the sidebar
        </p>
      </div>
    </div>
  );
}
