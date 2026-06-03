"use client"

import UserProfileImage from "../header/profile/userProfile";
import style from "@/styles/post.module.css";
import { Button } from "../ui/button";
import { ButtonData } from "@/types";
import { createPostBtn } from "@/styles/style";
import { Clapperboard, Image } from "lucide-react";
import { allPostData } from "@/dummy";

const data: ButtonData = {
    text: "create post",
    type: "submit",
    style: createPostBtn,
}

export default function UserPostUI() {
    return (
        <div className={style.postParentCont}>
            <div className={style.postHomeCont}>
                <div className={style.postHomeMain}>
                    <UserProfileImage />
                    <input className={style.postData} type="text" placeholder="what's on your mind" name="postData" />
                    <Button data={data} />
                </div>
                <div className={style.iconPostDisplay}>
                    <div className={style.iconFlex}>
                        <Image />
                        <span>photos</span>
                    </div>
                    <div className={style.iconFlex}>
                        <Clapperboard />
                        <span>videos</span>
                    </div>
                </div>
            </div>
            <MapAllPost />
        </div>
    )
}


export function AllPostUI() {}




export function MapAllPost() {
    return allPostData.map((data)=> {
        return (
            <div className={style.userPostDisplay}>
              <UserPostProfile fullName={data.fullName} status={data.status} />
            </div>
        )
    })
}

interface Props {
    fullName: string;
    status: string;
}

export function UserPostProfile({fullName, status}: Props) {
    return (
        <div className={style.postUserProfile}>
            <div className={style.userImageName}>
                <UserProfileImage />
                <span>
                    <p>{fullName}</p>
                </span>
            </div>
            <div>
                {status}
            </div>
        </div>
    )
}
