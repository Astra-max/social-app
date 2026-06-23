import Image from "next/image";
import style from "@/styles/profile.module.css";


interface Props {
  url?: string;
}

export default function UserProfileImage({ url="/profile.svg"  }: Props) {

  return (
    <div>
      <div className={style.imageCont}>
        <Image
          className={style.userImage}
          src={url}
          fill
          priority
          sizes="(max-width: 768px) 100vw 50vw"
          alt="user profile image"
          loading="eager"
        />
      </div>
    </div>
  );
}
