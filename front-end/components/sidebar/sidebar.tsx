"use client";

import { useState } from "react";
import { sidebarNav } from "@/data";
import { logOutUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import "@/styles/nav-side-bar.css";
import { activeRoute, nonActive, navSideBar } from "@/styles/style";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavSideBar() {
  const path = usePathname();
  const { toggle } = useSelector((state: RootState) => state.toggleSideBar);
  const [err, setErr] = useState(null)
  const dispatch = useAppDispatch()

  async function handleLogout() {
    try {
      await dispatch(logOutUser()).unwrap()
    } catch (error: any) {
      setErr(error)
    }
  }

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
                v.text === "Home" && (path === "/" || path === "/view/Home")
                  ? activeRoute
                  : path === "/view/" + v.text
                    ? activeRoute
                    : nonActive
              }
            >
              <span>{<v.icon />}</span>
              {!toggle && <span>{v.text}</span>}
            </Link>
          );
        })}
        <div className="cursor-pointer" onClick={handleLogout}>
          <span className="flex items-center gap-3">
            <LogOut 
            className="text-red-600"
            size={20} />
            Logout
          </span>
        </div>
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
    <div  style={styleLogo}>
      <Link href={"/view/Home"}>
        <Image
          src={"/social-network-logo.svg"}
          width={50}
          height={50}
          alt="social-app logo"
          loading="eager"
        />
      </Link>
    </div>
  );
}
