import UserPostUI from "../post/post";
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
          <UserPostUI />
        </div>
    )
}