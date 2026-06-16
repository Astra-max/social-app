"use client"

import { ChatMessages } from "@/types";
import { Send } from "lucide-react"
import { useParams } from "next/navigation";
import { useState } from "react";

interface SendMessageType {
  sendMessage: (message: ChatMessages) => void;
}

export default function SendTextMessage({ sendMessage }: SendMessageType) {
    const [message, setMessage] = useState<string>("");
    const { userId } = useParams()

    const receiverId = Number(userId);

    function HandleSend() {
      if (!message.trim()) return;
      sendMessage({
        messageId: crypto.randomUUID(),
        senderId: Id,
        receiverId,
        content: message.trim(),
        createdAt: new Date().toISOString()
      })
      setMessage("")
    }

  return (
    <div className="bg-[#222222] border-t border-[#333] p-4">
      <div className="flex items-center gap-3">
        <input
         onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setMessage(event.target.value)}
          type="text"
          value={message}
          placeholder="Type a message..."
          className="
            flex-1
            bg-[#303030]
            rounded-full
            px-5
            py-3
            outline-none
            text-white
            placeholder:text-gray-400
          "
        />

        <button
          onClick={HandleSend}
          className="
            p-3
            rounded-full
            bg-(--primary-theme)
            cursor-pointer
            transition
            hover:scale-105
          "
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}