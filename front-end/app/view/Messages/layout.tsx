import { SingleUserChatProfile } from "./[userId]/page";
import SendTextMessage from "@/components/ui/sendUI";
import { Messages } from "./[userId]/page";
import ChatSideBar from "./chats";

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <div className="flex gap-3">
            <ChatSideBar />
            {children}
        </div>
    )
}

interface UserProfile {
    userProfileImage: string;
    fullName: string;
}

export function ChatContentLayout({
  data,
}: {
  data: UserProfile;
}) {
  return (
    <div className="w-full flex flex-col h-screen bg-[#181818]">
      <SingleUserChatProfile data={data} />

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <Messages />
      </div>

      <SendTextMessage />
    </div>
  );
}