"use client";

import UserProfileImage from "@/components/header/profile/userProfile";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { suggestedFollows } from "@/libs/dummy";
import { Button } from "@/components/ui/button";
import { ButtonData, FollowUsers } from "@/types";
import style from "@/styles/followers.module.css";
import { useState } from "react";

export default function FollowersUI() {
  return (
    <DefaultLayout>
      <Followers />
    </DefaultLayout>
  );
}

export function Followers() {
  const [activeNav, setActiveNavigation] = useState<string>("Followers")

  const pastAthousand: string =
    suggestedFollows.length >= 1000
      ? "K"
      : suggestedFollows.length >= 1_000_000
        ? "M"
        : "";

  const HandleRouteChange = () => setActiveNavigation("");

  return (
    <div className={style.followMainCont}>
      <div className={style.titleFollowers}>
        <ActiveRoutes count={suggestedFollows.length} />
      </div>
      <div></div>
      <div className={style.mappedFollowers}>
        {suggestedFollows.map((data) => (
          <People key={data.userId} data={data} />
        ))}
      </div>
    </div>
  );
}

export function People({ data }: { data: FollowUsers }) {
  const btnData: ButtonData = {
    text: "followers",
    style: { backgroundColor: "var(--primary-theme)", padding: "0.7rem 1rem" },
  };
  return (
    <div className={style.peopleCont}>
      <div className={style.imageNameLoc}>
        <div>
          <UserProfileImage url={data.userProfileImage} />
        </div>
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

export function ActiveRoutes({ count }: {count: number}) {
  const [active, setActive] = useState("Followers")

  const routes: {id: number, route: string}[] = [
    {id: 1, route: "Friends"},
    {id: 2, route: "Followers"},
    {id: 3, route: "Following"},
  ]

  function HandleActiveRoute(event: React.MouseEvent<HTMLDivElement>) {
    setActive(event.currentTarget.textContent)
  }
  return (
    <div>
      <p className={style.FollowerText} >{active}</p>
      <p>{count}</p>
      <div className={style.displayNetwork}>
      {routes.map((data) => {
        return (
          <div className={
            active === data.route ? style.activeNetwork : ""
          } key={data.id} onClick={HandleActiveRoute}>{data.route}</div>
        )
      })}
    </div>
    </div>
  )
}