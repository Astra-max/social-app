"use client";
import { ButtonData } from "@/types";
import { Button } from "../ui/button";
import style from "@/styles/login.module.css";
import { Lock, Unlock, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser, authSelector } from "@/store/features/authSlice";
import { setAccessToken } from "@/services/token";
import { setSession } from "@/store/features/authSlice";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ emailAddr: "", password: "" });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(authSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      const { accessToken, user } = result.payload;

      setAccessToken(accessToken);
      dispatch(setSession({ user }));

      router.replace("/view/Home");
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const isValid = formData.emailAddr.includes("@") && formData.password.length >= 6;

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
          <div className={style.userInputCont}>
            <label htmlFor="emailAddr">Email Address</label>
            <div className={style.iconPosition}>
              <Mail size={18} className={style.inputIcon} aria-hidden="true" />
              <input
                id="emailAddr"
                className={style.userInput}
                type="email"
                name="emailAddr"
                value={formData.emailAddr}
                onChange={handleChange}
                placeholder="someone@gmail.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          <div className={style.userInputCont}>
            <div className={style.labelRow}>
              <label htmlFor="password">Password</label>
              <Link href="/forgot-password" className={style.forgot}>
                Forgot password?
              </Link>
            </div>
            <div className={style.iconPosition}>
              <Lock size={18} className={style.inputIcon} aria-hidden="true" />
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
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={style.iconBtn}
              >
                {showPassword ? <Unlock size={18} /> : <Lock size={18} />}
              </button>
            </div>
          </div>

          <Button
            data={{
              text: loading ? "Signing in..." : "Sign in",
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
              type: "submit",
            }}
          />
        </form>

        <div className={style.orCont}>
          <span>or</span>
        </div>

        <Button
          data={{
            text: "Continue with Google",
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
            type: "button",
            onClick: handleGoogleLogin,
            icons: FcGoogle,
          }}
        />

        <p className={style.footer}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={style.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}