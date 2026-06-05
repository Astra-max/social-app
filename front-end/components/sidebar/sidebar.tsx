"use client";

import { sidebarNav } from "@/data";
import { RootState } from "@/store/store";
import "@/styles/nav-side-bar.css";
import { activeRoute, nonActive, navSideBar } from "@/styles/style";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavSideBar() {
  const path = usePathname();
  const { toggle } = useSelector((state: RootState) => state.toggleSideBar);

  const newStyle = {
    ...navSideBar,
    flex: "0 0 5.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "start",
  };

  return (
    <div style={toggle ? newStyle : navSideBar}>
      <Logo />
      <div className="ns-main-cont">
        {sidebarNav.map((v) => {
          return (
            <Link
              href={`/view/${v.text}`}
              key={v.id}
              style={
                v.text === "Home" && (path === "/" || path === "/Home")
                  ? activeRoute
                  : path === "/" + v.text
                    ? activeRoute
                    : nonActive
              }
            >
              <span>{<v.icon />}</span>
              {!toggle && <span>{v.text}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Logo() {
  const styleLogo = {
    padding: "2rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div style={styleLogo}>
      <div>
        <Image
          src={"/social-network-logo.svg"}
          width={50}
          height={50}
          alt="social-app logo"
          loading="eager"
        />
      </div>
    </div>
  );
}
