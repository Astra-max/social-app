"use client";

import UserProfileImage from "@/components/header/profile/userProfile";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { suggestedFollows } from "@/libs/dummy";
import { Button } from "@/components/ui/button";
import { ButtonData, FollowUsers } from "@/types";
import style from "@/styles/followers.module.css";
import { SearchUI } from "@/components/main/header";
import { useState } from "react";

type NetworkType = "Friends" | "Followers" | "Following" | "Suggested";

interface PeopleProp {
  data: FollowUsers;
  networkType: NetworkType;
}

interface ActiveRoutesProps {
  count: number;
  active: NetworkType;
  setActive: React.Dispatch<React.SetStateAction<NetworkType>>;
}

export default function FollowersUI() {
  return (
    <DefaultLayout>
      <Followers />
    </DefaultLayout>
  );
}

export function Followers() {
  const [active, setActive] = useState<NetworkType>("Friends");

  return (
    <div className={style.followMainCont}>
      <div className={style.followHeader}>
        <ActiveRoutes
          count={suggestedFollows.length}
          active={active}
          setActive={setActive}
        />
      </div>

      {/* Scrollable list only */}
      <div className={style.mappedFollowers}>
        {suggestedFollows.map((data) => (
          <People key={data.userId} data={data} networkType={active} />
        ))}
      </div>
    </div>
  );
}

export function People({ data, networkType }: PeopleProp) {
  const btnText =
    networkType === "Following"
      ? "Unfollow"
      : networkType === "Followers"
        ? "Remove"
        : networkType === "Suggested"
          ? "Follow"
          : "Unfriend";

  const btnData: ButtonData = {
    text: btnText,
    style: {
      backgroundColor: "var(--primary-theme)",
      padding: "0.5rem 1.25rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
  };

  return (
    <div className={style.peopleCont}>
      <div className={style.imageNameLoc}>
        <UserProfileImage url={data.userProfileImage} />
        <div className={style.personText}>
          <p className={style.personName}>{data.fullName}</p>
          <p className={style.personLocation}>{data.location}</p>
        </div>
      </div>
      <div>
        <Button data={btnData} />
      </div>
    </div>
  );
}

export function ActiveRoutes({ active, count, setActive }: ActiveRoutesProps) {
  const routes: NetworkType[] = [
    "Friends",
    "Followers",
    "Following",
    "Suggested",
  ];

  return (
    <div className={style.networkHeader}>
      {/* Title row */}
      <div className={style.networkTitleRow}>
        <div className={style.networkTitleGroup}>
          <p className={style.FollowerText}>{active}</p>
          <span className={style.networkCount}>{count}</span>
        </div>
        <SearchUI placeholder={`Search ${active.toLowerCase()}…`} />
      </div>

      {/* Tab row */}
      <div className={style.displayNetwork}>
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => setActive(route)}
            className={`${style.networkTab} ${active === route ? style.activeNetwork : ""}`}
          >
            {route}
          </button>
        ))}
      </div>
    </div>
  );
}
