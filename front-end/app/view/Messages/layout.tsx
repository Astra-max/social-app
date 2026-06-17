import { SingleUserChatProfile } from "./[userId]/page";
import SendTextMessage from "@/components/ui/sendUI";
import { Messages } from "./[userId]/page";
import ChatSideBar from "./chats";
import { ChatMessages, FollowUsers } from "@/types";
import ProtectedRoute from "@/components/protected/protected";

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <div className="flex gap-3">
            <ChatSideBar />
            {children}
        </div>
    )
}

interface Props {
    data: FollowUsers,
    connected: boolean;
    messages: ChatMessages[];
    sendMessage: (message: ChatMessages)=> void;
}

export function ChatContentLayout({
  data, connected, messages, sendMessage
}: Props) {
  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col h-screen bg-[#181818]">
      <SingleUserChatProfile data={data} />

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <Messages messages={messages} />
      </div>

      <SendTextMessage sendMessage={sendMessage} />
      {!connected && <p className="text-red-500 absolute align-middle">Connection offline...</p>}
    </div>
    </ProtectedRoute>
  );
}