import ChatSideBar from "@/components/chats/ChatSideBar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <ChatSideBar />
      {children}
    </div>
  );
}