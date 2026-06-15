import { LucideProps } from "lucide-react";
import { IconType } from "react-icons";

export interface FormState {
    success: boolean;
    error: string | null;
    message: string;
}

export interface ButtonData {
    text: string;
    onClick?: ()=> void;
    variants?: string;
    className?: string;
    style?: {};
    type?: "button" | "submit" | "reset";
    icons?: IconType;
}

export interface PostData {
    postId: number;
    timePosted: string;
    description: string;
    postImage: string;
    location: string;
    likes: number;
    comments: number;
    shares: number;
    tags: string[];
    postType: string;
}

export interface FollowUsers {
    userId: number;
    userProfileImage: string;
    fullName: string;
    location: string;
}

export interface UserProfile {
    userId: number;
    fullName: string;
    status: "public" | "private";
    userProfileImage: string;
}

export interface UserActivity {
    posts: number;
    followers: number;
    following: number;
    myPosts: UserPostData[];
    saved: UserPostData[];
}


export interface UserProfileData {
    userId: number;
    firstName: string;
    secondName: string;
    nickName: string;
    dateOfBirth: Date;
    profileImage: string;
    accountStatus: "public" | "private";
    aboutMe: string;
}

export interface ChatMessages {
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: Date;
}

export type UserPersonalData = UserProfileData & UserActivity
export type UserPostData = PostData & UserProfile
