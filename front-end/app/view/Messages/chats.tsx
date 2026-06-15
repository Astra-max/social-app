import UserProfileImage from "@/components/header/profile/userProfile";
import { SearchUI } from "@/components/main/header";
import { suggestedFollows } from "@/libs/dummy";
import { Logo } from "@/components/sidebar/sidebar";
import { Send } from "lucide-react";
import Link from "next/link";

export default function ChatSideBar() {
    return (
        <aside className="w-[29%] min-w-90.5 py-2 px-6 h-screen flex flex-col gap-1 bg-[#222222]">
            <Logo />
            <div className="flex flex-col gap-2">
                <p className="font-bold py-1 text-2xl text-[#14afa7]">Chat Messages</p>
                <SearchUI placeholder="search friends...." />
            </div>
            <div className="mt-2.5 flex flex-col gap-3 flex-1 overflow-y-auto">
                {suggestedFollows.map((data) => {
                    return (
                        <Link 
                        href={`/view/Messages/${data.userId}`}
                        key={data.userId} 
                        className="flex justify-between  w-full rounded-b-md px-2 py-3 cursor-pointer hover:rounded-lg hover:bg-[#383737]"
                        >
                            <div className="flex gap-3 items-start flex-1 min-w-0">
                                <UserProfileImage url={data.userProfileImage} />
                                <p className="font-bold truncate min-w-0">{data.fullName}</p>
                            </div>
                            <div>
                                <div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm shrink-0 text-gray-300 font-bold">2m</p>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </aside>
    )
}



export function MyFriends() { }