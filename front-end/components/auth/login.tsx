"use client";

import { ButtonData } from "@/types";
import { Button } from "../ui/button";
import style from "@/styles/login.module.css";
import { insertIcon } from "@/styles/style";
import { Lock, Mail, Unlock } from "lucide-react";
import { useState } from "react";


const btnStyle: ButtonData = {
    text: "login now!!!",
    style: { backgroundColor: "var(--primary-theme)", border: "0rem" },
    type: "submit",
  };

  const authProviderLoginStyle: ButtonData = {
    text: "Login with Google",
    style: {
      background: "transparent",
      border: "0.1rem solid var(--primary-theme)",
    },
    type: "submit",
  };


export default function LogIn() {
    const [ toggle, setToggle ] = useState<boolean>(false)

    const handleSetToggle = () => setToggle((prev) => !prev);

  return (
    <form className={style.loginMain} action="">
      <div className={style.loginCont}>
        <div>
          <p className={style.welcomeNote}>Welcome to social network app</p>
          <p>Sign in to continue</p>
        </div>
        <div className={style.userInputCont}>
          <p>Email Address</p>
          <div style={{position: "relative"}}>
            <Mail size={20} style={insertIcon} />
            <input
            className={`${style.userInput}`}
            type="email"
            name="emailAddr"
            id=""
            placeholder="someone@gmail.com"
            required
          />
          </div>
        </div>

        <div className={style.userInputCont}>
          <span>
            <p>Password</p>
            <p style={{color: "var(--primary-theme)", cursor: "pointer"}}>Forgot password</p>
          </span>
          <div className={style.iconPosition}>
            { !toggle ? 
            <Lock size={24} style={insertIcon} onClick={handleSetToggle} /> :
            <Unlock size={24} style={insertIcon} onClick={handleSetToggle} />
            }
            <input
              className={`${style.userInput}`}
              name="password"
              type={`${!toggle ? "password": "text"}`}
              placeholder="*****************************"
              required
            />
          </div>
        </div>
        
        <div>
          <Button data={btnStyle} />
        </div>
        <div>
          <span>or</span>
        </div>
        <div>
          <Button data={authProviderLoginStyle} />
        </div>
        <div>
          <p>Didn't have account 
            <span style={{color: "var(--primary-theme)", cursor: "pointer", paddingLeft: "0.6rem"}}>register</span></p>
        </div>
      </div>
    </form>
  );
}
