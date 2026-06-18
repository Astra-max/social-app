import { PanelRightOpen } from "lucide-react";
import Image from "next/image";
import style from "@/styles/profile.module.css"

export default function UserPersonalData() {
    return (
        <div>
            <BasicData />
        </div>
    )
}


export function InteractionSection() {
}

export function BasicData() {
    return (
        <div className={style.imageStatusMain}>
            <div className={style.imageStatusCont}>
                <Image src={"/maodongo.jpeg"} width={30} height={40} alt="user image" />
                <div className={style.statusCont}>
                    <span>private</span>
                    <PanelRightOpen size={24} color="var(--primary-theme)" />
                </div>
            </div>
        </div>
    )
}