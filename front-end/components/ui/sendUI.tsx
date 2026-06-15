import { Send } from "lucide-react"



export default function SendTextMessage() {
  return (
    <div className="bg-[#222222] border-t border-[#333] p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
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