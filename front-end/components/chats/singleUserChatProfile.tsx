"use client"

import UserProfileImage from "@/components/header/profile/userProfile";
import { Phone, Video, MoreVertical } from "lucide-react";
import { suggestedFollows } from "@/libs/dummy";
import { useParams, usePathname } from "next/navigation";
import ChatContentLayout from "@/components/chats/chatContentLayout";
import useSocket, { SocketType } from "@/hooks/useSocket";
import loadEnvFile from "@/config/config";
import { NewChat } from "@/components/chats/messages";

interface Props {
  userProfileImage: string;
  fullName: string;
}


export default function SingleUserChatProfile({ data }: { data: Props}) {
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
        <Phone className="cursor-pointer" size={20} />
        <Video className="cursor-pointer" size={20} />
        <MoreVertical className="cursor-pointer" size={20} />
      </div>
    </header>
  );
}



export  function ChatUser() {
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


