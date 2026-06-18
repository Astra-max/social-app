import ProtectedRoute from "@/components/protected/protected";
import  { ChatUser } from "@/components/chats/singleUserChatProfile";


export default function MessagesUI() {
  return (
    <ProtectedRoute>
      <ChatUser />
    </ProtectedRoute>
  );
}