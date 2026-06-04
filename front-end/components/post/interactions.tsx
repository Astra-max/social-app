import { BookMarkedIcon, Heart, MessageCircleReply } from "lucide-react";
import style from "@/styles/interactions.module.css"


interface Props {
    likes: number;
    comments: number;
}


export function PostInteractions({ likes, comments }: Props) {
    return (
        <div className={style.displayInteractions}>
            <div className={style.likeCommentCont}>
                <div className={style.likeComment}>
                    <Heart />
                    {likes}
                </div>
                <div className={style.likeComment}>
                    <MessageCircleReply />
                    {comments}
                </div>
            </div>
            <span>
                <BookMarkedIcon />
            </span>
        </div>
    )
}

export function CommentsSectionUI() {}