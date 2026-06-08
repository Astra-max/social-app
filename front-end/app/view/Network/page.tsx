"use client";

import UserProfileImage from "@/components/header/profile/userProfile";
import DefaultLayout from "@/components/layouts/defaultLayout";
import { suggestedFollows } from "@/libs/dummy";
import { Button } from "@/components/ui/button";
import { ButtonData, FollowUsers } from "@/types";
import style from "@/styles/followers.module.css";

export default function FollowersUI() {
  return (
    <DefaultLayout>
      <Followers />
    </DefaultLayout>
  );
}

export function Followers() {
  const pastAthousand: string =
    suggestedFollows.length >= 1000
      ? "K"
      : suggestedFollows.length >= 1_000_000
        ? "M"
        : "";

  return (
    <div className={style.followMainCont}>
      <div className={style.titleFollowers}>
        <p className={style.FollowerText}>Followers</p>
        <p>
          <span style={{color: "var(--primary-theme)", fontSize: "1.4rem", fontWeight: "bold"}}>{suggestedFollows.length}</span>
          {pastAthousand} followers
        </p>
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
