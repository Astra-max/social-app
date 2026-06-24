"use client";

import { ButtonData } from "@/types";
import { Button } from "../ui/button";
import style from "@/styles/register.module.css";
import { useState } from "react";
import { Camera } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { registerUser } from "@/store/features/authSlice";


interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const btnStyle: ButtonData = {
  text: "create account",
  style: { backgroundColor: "var(--primary-theme)", marginTop: "1rem" },
};

export default function RegisterUI({ setRegister }: Props) {
  const [about, setAbout] = useState<string>("");
  const [remove, setRemove] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const HandleRemove = () => setRemove((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const fileInput = document.querySelector(
      'input[name="userProfile"]'
    ) as HTMLInputElement;

    if (fileInput?.files?.[0]) {
      form.append("avatar", fileInput.files[0]);
    }

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      console.log("Registered:", result.payload);
      setRegister(false);
    }
  };

  const HandleSetAboutMe = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAbout(event.target.value);

  return (
    <>
      {!remove && (
        <form className={style.registerMainCont} action="" onSubmit={handleSubmit}>
          <div className={style.imageAndData}>
            <div>
              <UploadAvatar />
            </div>
            <div className={style.registerCont}>
              <div>
                <p className={style.pTitle}>Create your Account</p>
                <p className={style.pGoing}>Signup to chat on social network</p>
              </div>
              <div className={style.firstAndSecond}>
                <div>
                  <p className={style.inputPtag}>First Name</p>
                  <input
                    className={style.inputField}
                    type="text"
                    name="firstName"
                    id="first-name"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <p className={style.inputPtag}>Second Name</p>
                  <input
                    className={style.inputField}
                    type="text"
                    name="secondName"
                    id="second-name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div>
                <p className={style.inputPtag}>Nick Name</p>
                <input
                  className={style.inputField}
                  type="text"
                  name="nickName"
                  id="nick-name"
                  placeholder="mistery_man"
                />
              </div>
              <div>
                <p className={style.inputPtag}>Date of birth</p>
                <input
                  className={style.inputField}
                  type="date"
                  name="dateOfBirth"
                  id="dob"
                />
              </div>
              <div>
                <p className={style.inputPtag}>Email Address</p>
                <input
                  className={style.inputField}
                  type="email"
                  name="emailAddr"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
              <div>
                <p className={style.inputPtag}>Password</p>
                <input
                  className={style.inputField}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <p className={style.inputPtag}>About me</p>
                <textarea
                  className={style.textareaField}
                  name="aboutMe"
                  id="about-me"
                  value={about}
                  cols={40}
                  rows={5}
                  onChange={HandleSetAboutMe}
                  placeholder="About me"
                ></textarea>
              </div>
              <div>
                <Button data={btnStyle} />
                <p className={style.backLogin}>
                  Have account{" "}
                  <span
                    style={{ color: "var(--primary-theme)", cursor: "pointer" }}
                    onClick={() => setRegister(false)}
                  >
                    login
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export function UploadAvatar() {
  const [fileName, setFileName] = useState<string | null>(null)
  function handleChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      setFileName(file.name)
    }
  }
  return (
    <div className={style.avatarMain}>
      <label className={style.avatarCont}>
        <Camera size={70} style={{ color: "var(--primary-theme)" }} />
        <input type="file"
         name="userProfile" 
         accept="image/*" 
         capture 
         onChange={handleChangeAvatar}
         hidden />
      </label>
      <div>
        <p>{fileName}</p>
        <p>PNG, JPG, JPEG or GIF max 5mb</p>
      </div>
    </div>
  );
}
