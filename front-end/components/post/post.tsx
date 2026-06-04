"use client";

import UserProfileImage from "../header/profile/userProfile";
import style from "@/styles/post.module.css";
import { Button } from "../ui/button";
import { ButtonData, PostData } from "@/types";
import { createPostBtn } from "@/styles/style";
import { Clapperboard, Image as LucideImage } from "lucide-react";
import { allPostData } from "@/dummy";
import Image from "next/image";
import { CSSProperties } from "react";

const data: ButtonData = {
  text: "create post",
  type: "submit",
  style: createPostBtn,
};

export default function UserPostUI() {
  return (
    <div className={style.postParentCont}>
      <div className={style.postHomeCont}>
        <div className={style.postHomeMain}>
          <UserProfileImage />
          <input
            className={style.postData}
            type="text"
            placeholder="what's on your mind"
            name="postData"
          />
          <Button data={data} />
        </div>
        <div className={style.iconPostDisplay}>
          <div className={style.iconFlex}>
            <LucideImage />
            <span>photos</span>
          </div>
          <div className={style.iconFlex}>
            <Clapperboard />
            <span>videos</span>
          </div>
        </div>
      </div>
      <AllPostUI />
    </div>
  );
}

export function AllPostUI() {
  return (
    <div className={style.AllPostLayout}>
      <MapAllPost />
    </div>
  );
}

export function MapAllPost() {
  return allPostData.map((data) => {
    return (
      <div key={data.postId} className={style.userPostDisplay}>
        <UserPostProfile
          userImage={data.userProfileImage}
          fullName={data.fullName}
          status={data.status}
          datePosted={data.timePosted}
        />
        <UserPostContent
          description={data.description}
          postImage={data.postImage}
        />
      </div>
    );
  });
}

interface Props {
  userImage?: string;
  fullName: string;
  status: string;
  datePosted: string;
}

export function UserPostProfile({
  userImage,
  fullName,
  status,
  datePosted,
}: Props) {
  return (
    <div className={style.postUserProfile}>
      <div className={style.userImageName}>
        <UserProfileImage url={userImage} />
        <span>
          <p>{fullName}</p>
          <p>posted at {datePosted}</p>
        </span>
      </div>
      <div>{status}</div>
    </div>
  );
}

interface ContentInterface {
  description: string;
  postImage?: string;
}

export function UserPostContent({ description, postImage }: ContentInterface) {
  const imageStyle: CSSProperties = {
    objectFit: "cover",
    borderRadius: "0.5rem",
  };

  return (
    <div className={style.postContMain}>
      <div className={style.postContMain}>
        {postImage ? (
          <>
            <div>
              <p>{description}</p>
            </div>

            <div className={style.postsImageCont}>
              <Image
                src={postImage}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={imageStyle}
                alt="post image"
              />
            </div>
          </>
        ) : (
          <PostDescriptionUI description={description} />
        )}

        <div>
          <p>dummy interactions</p>
        </div>
      </div>
    </div>
  );
}

export function PostDescriptionUI({ description }: ContentInterface) {
  return (
    <div>
      <p className={style.shoutDescription}>{description}</p>
    </div>
  );
}
