"use client";

import UserProfileImage from "../header/profile/userProfile";
import style from "@/styles/all-post.module.css";
import { Button } from "../ui/button";
import { ButtonData } from "@/types";
import { createPostBtn } from "@/styles/style";
import { Clapperboard, Eye, LockIcon, Image as LucideImage } from "lucide-react";
import { allPostData } from "@/libs/dummy";
import Image from "next/image";
import { CSSProperties } from "react";
import { PostInteractions } from "./interactions";

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
          <div>
            <Button data={data} />
          </div>
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
          privacy={data.status}
        />
        <UserPostContent
          description={data.description}
          postImage={data.postImage}
          likes={data.likes}
          comments={data.comments}
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
  privacy: string;
}

export function UserPostProfile({
  userImage,
  fullName,
  status,
  datePosted,
  privacy,
}: Props) {
  return (
    <div className={style.postUserProfile}>
      <div className={style.userImageName}>

        <UserProfileImage url={userImage} />

        <span className={style.userPostProfile}>
          <p>{fullName}</p>
          <p>posted on {datePosted}</p>
        </span>
      </div>
      <div className={style.userPrivacy}>
        {privacy === "public" ? <Eye /> : <LockIcon />}
        {status}
      </div>
    </div>
  );
}

interface ContentInterface {
  description: string;
  postImage?: string;
  likes: number;
  comments: number;
}

export function UserPostContent({ description, postImage, likes, comments }: ContentInterface) {
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
              <p className={style.postDesscription} >{description}</p>
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
          <PostInteractions comments={comments} likes={likes} />
        </div>
      </div>
    </div>
  );
}

interface DescriptionProps {
  description: string;
}

export function PostDescriptionUI({ description } : DescriptionProps) {
  return (
    <div>
      <p className={style.shoutDescription}>{description}</p>
    </div>
  );
}
