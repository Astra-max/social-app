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
                    <Heart size={24} />
                    <span>{likes}</span>
                </div>
                <div className={style.likeComment}>
                    <MessageCircleReply size={24} />
                     <span>{comments}</span>
                </div>
            </div>
            <span>
                <BookMarkedIcon size={24} />
            </span>
        </div>
    )
}

export function CommentsSectionUI() {}