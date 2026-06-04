import { CSSProperties } from "react";
import UserPostUI from "../post/post";
import { Follow } from "../sidebar/follow";
import NavSideBar from "../sidebar/sidebar";
import HomeProfileUI from "./header";
import "@/styles/nav-side-bar.css"

export default function HomeDisplayLayout() {
    return (
        <div className="display-home-pg">
            <NavSideBar />
            <MiddlePageLayout />
        </div>
    )
}

export function MiddlePageLayout() {
    return (
        <div className="display-middle-section-h">
          <HomeProfileUI />
          <div style={middleSectionStyle}>
            <div style={{flex: 2, minWidth: 0}}>
                <UserPostUI />
            </div>
            <div style={{flex: 1, minWidth: 0}}>
                <Follow />
            </div>
          </div>
        </div>
    )
}

export const middleSectionStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden"
}