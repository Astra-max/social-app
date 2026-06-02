"use client"

import { sidebarNav } from "@/dummy";
import "@/styles/nav-side-bar.css"
import { activeRoute, nonActive, navSideBar } from "@/styles/style";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Columns2 } from "lucide-react";
import { useState } from "react";


interface Props {
    onToggle: ()=> void;
}


export default function NavSideBar() {
    const path = usePathname()
    const [toggle, setToggle] = useState<boolean>(false)

    const newStyle = {...navSideBar, width: "3%", overflow: "hidden"}

    return (
        <div style={toggle ? newStyle : navSideBar}>
            <Logo onToggle={() => setToggle((prev)=> !prev)} />
            <div className="ns-main-cont">
                {sidebarNav.map((v) => {
                    return (
                        <Link href={`/${v.text}`} key={v.id} style={
                            v.text === "Home" && (path === "/" || path === "/Home") ? activeRoute :
                                path === "/" + v.text ? activeRoute : nonActive
                        }>
                            <span>
                                {<v.icon />}
                            </span>
                            <span>
                                {v.text}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export function Logo({ onToggle }: Props) {

    const styleLogo = {
        padding: "2rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }

    const styleCollapseIcon = {
        cursor: "pointer",
    }

    return (
        <div style={styleLogo}>
            <div>
                <Image src={"/social-network-logo.svg"} width={50} height={50} alt="social-app logo" />
            </div>
            <div>
                <Columns2 size={24} style={styleCollapseIcon} onClick={onToggle} />
            </div>
        </div>
    )
}