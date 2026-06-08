"use client";

import { ButtonData } from "@/types";
import { Button } from "../ui/button";
import style from "@/styles/register.module.css";
import loginStyle from "@/styles/login.module.css";
import { useState } from "react";
import { Camera } from "lucide-react";


const btnStyle: ButtonData = {
  text: "create account",
  style: { backgroundColor: "var(--primary-theme)", marginTop: "1rem" },
};

export default function RegisterUI() {
  const [about, setAbout] = useState<string>("");
  const [remove, setRemove] = useState<boolean>(false);

  const HandleRemove = () => setRemove((prev) => !prev);

  const HandleSetAboutMe = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAbout(event.target.value);

  return (
    <>
      {!remove && (
        <form className={style.registerMainCont} action="">
          <div className={style.imageAndData}>
            <div>
              <UploadAvatar />
            </div>
            <div className={style.registerCont}>
              <p className={style.removeRegister} onClick={HandleRemove}>
                x
              </p>
              <div>
                <p className={style.pTitle}>Create your Account</p>
                <p className={style.pGoing}>Signup to chat on social network</p>
              </div>
              <div className={style.firstAndSecond}>
                <div>
                  <p className={style.inputPtag}>First Name</p>
                  <input
                    className={loginStyle.userInput}
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
                    className={loginStyle.userInput}
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
                  className={loginStyle.userInput}
                  type="text"
                  name="nickName"
                  id="nick-name"
                  placeholder="mistery_man"
                />
              </div>
              <div>
                <p className={style.inputPtag}>Date of birth</p>
                <input
                  className={loginStyle.userInput}
                  type="date"
                  name="dateOfBirth"
                  id="dob"
                />
              </div>
              <div>
                <p className={style.inputPtag}>Email Address</p>
                <input
                  className={loginStyle.userInput}
                  type="email"
                  name="emailAddr"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
              <div>
                <p className={style.inputPtag}>About me</p>
                <textarea
                  className={loginStyle.userInput}
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
  return (
    <div className={style.avatarMain}>
      <label className={style.avatarCont}>
        <Camera size={70} style={{ color: "var(--primary-theme)" }} />
        <input type="file" name="userProfile" accept="image/*" capture hidden />
      </label>
      <div>
        <p>Upload Avatar</p>
        <p>PNG, JPG, JPEG or GIF max 5mb</p>
      </div>
    </div>
  );
}
