"use client"

import { ArrowRight, Menu } from "lucide-react";
import { FormState, ButtonData } from "@/types"
import { useActionState } from "react"
import { Button } from "../ui/button"
import { Home, Bell, MessageSquareDot } from "lucide-react"
import "@/styles/nav-side-bar.css"
import UserProfileImage from "../header/profile/userProfile"
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "@/store/features/toggleSideBarSlice";
import { RootState } from "@/store/store";


export function SearchUI() {

    const initialState: FormState = {
        success: false,
        message: "",
        error: null,
    }

    const buttonData: ButtonData = {
        text: "search",
        type: "submit"
    }

    const [state, formAction] = useActionState<FormState, FormData>(sendData, initialState)


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

export function ToggleSideBar() {
    const dispatch = useDispatch()
    const { toggle } = useSelector((state: RootState) => state.toggleSideBar)

    const styleCollapseIcon = {
        cursor: "pointer",
    }
    return (
        <div>
            {toggle ? <ArrowRight width={27} strokeWidth={3} color="var(--primary-theme)" onClick={() => dispatch(setToggle())} /> :
            <Menu size={30} style={styleCollapseIcon} color="var(--primary-theme)" strokeWidth={2} onClick={() => dispatch(setToggle())} />
            }
        </div>
    )

}

export default function HomeProfileUI() {
    return (
        <div className="home-d-n-main">
            <div>
                <ToggleSideBar />
            </div>
            <div className="display-home-nav">
                <SearchUI />
                <HomeNavElements />
                <UserProfileImage />
            </div>
        </div>
    )
}
