"use client"

import UserProfileImage from "@/components/header/profile/userProfile"
import { suggestedFollows } from "@/libs/dummy"
import { useParams, usePathname } from "next/navigation"
import Image from "next/image"

export default function ChatUser() {
    const { userId } = useParams()
    const pathName = usePathname()

    if (pathName && pathName === "/view/Messages") return <NewChat />

    const id = Number(userId)

    const data = suggestedFollows.find((singleUser) => singleUser.userId === id)

    if (data) return <SingleUser data={data} />

    return <p>User with id {userId} not found</p>
}

interface UserProfile {
    userProfileImage: string;
    fullName: string;
}


export function SingleUser({ data }: { data: UserProfile }) {
    return (
        <div className="w-full flex items-start justify-between px-3 py-2 bg-[#222222] h-25 mr-2 ml-2 rounded-lg">
            <div className="flex gap-4 items-start py-3">
                <UserProfileImage url={data.userProfileImage} />
                <div>
                    <p className="font-bold text-1xl">{data.fullName}</p>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export function NewChat() {
    return (
        <div className="w-full h-screen flex flex-col align-middle justify-center">
            <div className="w-full h-screen flex flex-col items-center gap-3 justify-center">
                <Image
                    width={170}
                    height={400}
                    src="/chat.svg"
                    alt="start new chat" />
                <p className="text-2xl text-gray-400">Start new chat</p>
            </div>
        </div>
    )
}