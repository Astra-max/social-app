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

export interface UserProfile {
    userId: number;
    fullName: string;
    status: "public" | "private";
    userProfileImage: string;
}

export type UserPostData = PostData & UserProfile