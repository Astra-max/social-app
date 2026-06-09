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
      <div className={style.titleFollowers}>
        <ActiveRoutes
          count={suggestedFollows.length}
          active={active}
          setActive={setActive}
        />
      </div>
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
      padding: "0.5rem 1rem",
    },
  };

  return (
    <div className={style.peopleCont}>
      <div className={style.imageNameLoc}>
        <UserProfileImage url={data.userProfileImage} />

        <div>
          <p>{data.fullName}</p>
          <p>{data.location}</p>
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
    <div className={style.nertworkSearchCont}>
      <div className={style.nertworkSearch}>
        <div>
          <p className={style.FollowerText}>{active}</p>
          <p
            style={{
              color: "var(--primary-theme)",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            {count}
          </p>
        </div>
        <div style={{flex: "1"}}>
          <SearchUI />
        </div>
      </div>
      <div className={style.displayNetwork}>
        {routes.map((route) => (
          <div
            key={route}
            onClick={() => setActive(route)}
            className={
              active === route ? style.activeNetwork : style.networkItem
            }
          >
            {route}
          </div>
        ))}
      </div>
    </div>
  );
}
