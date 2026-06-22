"use client";

import { Button } from "../ui/button";
import style from "@/styles/login.module.css";
import { Lock, Unlock, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, authSelector, setSession } from "@/store/features/authSlice";

interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogIn({ setRegister }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(authSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      // backend already sets session cookie
      // we just store user in redux
      dispatch(setSession({ user: result.payload }));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const isValid =
    formData.email.includes("@") && formData.password.length >= 6;

  return (
    <div className={style.loginWrapper}>
      <div className={style.loginCont}>
        <div className={style.welcomeCont}>
          <h1 className={style.welcomeNote}>Welcome back</h1>
          <p>Sign in to continue</p>
        </div>

        {error && (
          <div className={style.error} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={style.form} noValidate>
          {/* EMAIL */}
          <div className={style.userInputCont}>
            <label htmlFor="email">Email Address</label>

            <div className={style.iconPosition}>
              <Mail size={18} className={style.inputIcon} />
              <input
                id="email"
                className={style.userInput}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="someone@gmail.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className={style.userInputCont}>
            <div className={style.labelRow}>
              <label htmlFor="password">Password</label>

              <Link href="/forgot-password" className={style.forgot}>
                Forgot password?
              </Link>
            </div>

            <div className={style.iconPosition}>
              <Lock size={18} className={style.inputIcon} />

              <input
                id="password"
                className={`${style.userInput} ${style.passwordInput}`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className={style.iconBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Unlock size={18} /> : <Lock size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            data={{
              text: loading ? "Signing in..." : "Sign in",
              type: "submit",
              style: {
                backgroundColor: "var(--primary-theme)",
                border: "none",
                color: "#000",
                opacity: loading || !isValid ? 0.6 : 1,
                cursor: loading || !isValid ? "not-allowed" : "pointer",
                width: "100%",
                padding: "0.85rem",
                borderRadius: "0.6rem",
                fontWeight: 600,
                fontSize: "0.95rem",
              },
            }}
          />
        </form>

        {/* OR */}
        <div className={style.orCont}>
          <span>or</span>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          data={{
            text: "Continue with Google",
            type: "button",
            onClick: handleGoogleLogin,
            icons: FcGoogle,
            style: {
              backgroundColor: "#1f1f1f",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "0.85rem",
              borderRadius: "0.6rem",
              fontWeight: 500,
            },
          }}
        />

        {/* SWITCH TO REGISTER */}
        <p className={style.footer}>
          Don&apos;t have an account?{" "}
          <span
            className={style.link}
            onClick={() => setRegister(true)}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}