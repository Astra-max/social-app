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
        <>
          <HomeProfileUI />
        </>
    )
}