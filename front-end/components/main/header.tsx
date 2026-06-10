"use client";

import { ArrowRight, Menu, Search } from "lucide-react";
import { FormState, ButtonData } from "@/types";
import { useActionState } from "react";
import { Home, Bell, MessageSquareDot } from "lucide-react";
import "@/styles/nav-side-bar.css";
import UserProfileImage from "../header/profile/userProfile";
import { useDispatch, useSelector } from "react-redux";
import { setToggle } from "@/store/features/toggleSideBarSlice";
import { RootState } from "@/store/store";


interface SearchUIProps {
  placeholder?: string;
  className?: string;
}

export const sendData = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const query = formData?.get("search") as string;
  return {
    success: true,
    message: `${query} sent successfully`,
    error: null,
  };
};

export function SearchUI({
  placeholder = "Search users, posts, groups…",
  className = "",
}: SearchUIProps) {
  const initialState: FormState = { success: false, message: "", error: null };
  const [, formAction] = useActionState<FormState, FormData>(sendData, initialState);

  return (
    <form action={formAction} className={`search-form ${className}`}>
      <div className="search-inner">
        <Search className="search-icon-svg" size={16} aria-hidden="true" />
        <input
          className="search-input"
          type="search"
          name="search"
          id="search"
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
    </form>
  );
}

export function HomeNavElements() {
  const navElements = [
    { id: 1, Icon: Home },
    { id: 2, Icon: Bell },
    { id: 3, Icon: MessageSquareDot },
  ];
  return (
    <div className="display-nav-h-icons">
      {navElements.map((icon) => {
        return <div key={icon.id}>{<icon.Icon size={23} />}</div>;
      })}
    </div>
  );
}

export function ToggleSideBar() {
  const dispatch = useDispatch();
  const { toggle } = useSelector((state: RootState) => state.toggleSideBar);

  const styleCollapseIcon = {
    cursor: "pointer",
  };
  return (
    <div>
      {toggle ? (
        <ArrowRight
          width={27}
          strokeWidth={3}
          color="var(--primary-theme)"
          onClick={() => dispatch(setToggle())}
        />
      ) : (
        <Menu
          size={30}
          style={styleCollapseIcon}
          color="var(--primary-theme)"
          strokeWidth={2}
          onClick={() => dispatch(setToggle())}
        />
      )}
    </div>
  );
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
  );
}
