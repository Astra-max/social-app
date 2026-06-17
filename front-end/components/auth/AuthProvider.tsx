"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { Api } from "@/services/axios";
import { setSession, logout } from "@/store/features/authSlice";
import { setAccessToken } from "@/services/token";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 🔐 ask backend if session is valid
        const res = await Api.post("/auth/refresh");

        const { accessToken, user } = res.data;

        setAccessToken(accessToken);
        dispatch(setSession({ user }));

      } catch (err) {
        dispatch(logout());
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  // prevent UI flash
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#fff"
      }}>
        Loading session...
      </div>
    );
  }

  return <>{children}</>;
}