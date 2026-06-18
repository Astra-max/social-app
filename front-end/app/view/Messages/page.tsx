import ProtectedRoute from "@/components/protected/protected"
import ChatUser from "./[userId]/page"

export default function MessagesUI() {
    return (
      <ProtectedRoute>
        <ChatUser />
      </ProtectedRoute>
    )
}