import ChatSideBar from "./chats";

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <div className="flex">
            <ChatSideBar />
            {children}
        </div>
    )
}