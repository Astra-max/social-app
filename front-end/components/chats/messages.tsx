"use client"


import { useParams } from "next/navigation";
import { ChatMessages } from "@/types";
import Image from "next/image";

export default function Messages({
  messages,
}: {
  messages: ChatMessages[];
}) {
  const { userId } = useParams();

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.messageId}
          text={msg.content}
          sender={msg.senderId === Number(userId)}
        />
      ))}
    </div>
  );
}

export function MessageBubble({
  text,
  sender,
}: {
  text: string;
  sender: boolean;
}) {
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
        <Image src="/chat.svg" alt="new chat" width={180} height={180} />

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