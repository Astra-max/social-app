"use client";

import { suggestedFollows } from "@/libs/dummy";
import { ButtonData, FollowUsers } from "@/types";
import { Button } from "../ui/button";
import Image from "next/image";
import style from "@/styles/follow.module.css";
import { btnFollowStyle } from "@/styles/style";

export function RightSideBarUI() {
  return <Follow />;
}

export function Follow() {
  return (
    <div className={style.userSFollowMain}>
        <p className={style.people}>People you may know</p>
      {suggestedFollows.map((data) => (
        <FollowUserUI key={data.userId} data={data} />
      ))}
    </div>
  );
}

export function FollowUserUI({ data }: { data: FollowUsers }) {
  const buttonData: ButtonData = {
    text: "follow",
    style: btnFollowStyle,
  };

  return (
    <div className={style.userSFollowCont}>
      <div className={style.displayFollowProf}>
        <div className={style.followImage}>
          <Image
            src={data.userProfileImage}
            priority
            fill
            alt={`${data.fullName} profile image`}
          />
        </div>
        <div>
          <p>{data.fullName}</p>
          <p>{data.location}</p>
        </div>
      </div>
      <Button data={buttonData} />
    </div>
  );
}
