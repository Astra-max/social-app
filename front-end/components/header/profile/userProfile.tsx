import Image from "next/image";
import style from "@/styles/profile.module.css"

export default function UserProfileImage() {
    return (
        <div>
            <div className={style.imageCont}>
                <Image className={style.userImage} src={"/maodongo.jpeg"} width={80} height={80} alt="user profile image" loading="eager" />
            </div>
        </div>
    )
}