"use client"

import { FormState, ButtonData } from "@/types"
import { useActionState } from "react"
import { Button } from "../ui/button"
import { Home, Bell, MessageSquareDot } from "lucide-react"
import "@/styles/nav-side-bar.css"
import UserProfileImage from "../header/profile/userProfile"


export function SearchUI() {

    const initialState: FormState = {
        success: false,
        message: "",
        error: null,
    }

    const buttonData: ButtonData = {
        text: "search",
    }

    const [state, formAction] = useActionState<FormState>(sendData, initialState)


    return (
        <form action={formAction} className="style-search-fm">
            <input className="search-bar" type="search" name="search" id="search" placeholder="search user, posts, groups, events" />
            <Button data={buttonData} />
        </form>
    )
}

export const sendData = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const email = formData?.get("search") as string
    return { success: true, message: `${email} sent search succefully`, error: null }
}


export function HomeNavElements() {
    const navElements = [
        { id: 1, Icon: Home },
        { id: 2, Icon: Bell },
        { id: 3, Icon: MessageSquareDot },

    ]
    return (
        <div className="display-nav-h-icons">
            {navElements.map((icon) => {
                return (
                    <div key={icon.id}>
                        {<icon.Icon size={23} />}
                    </div>
                )
            })}
        </div>
    )
}

export default function HomeProfileUI() {
    return (
        <div className="display-home-nav">
            <SearchUI />
            <HomeNavElements />
            <UserProfileImage />
        </div>
    )
}
