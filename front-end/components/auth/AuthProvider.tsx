"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { Api } from "@/services/axios";
import { setSession, logout } from "@/store/features/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await Api.get("/auth/me");

        dispatch(setSession({ user: res.data.user }));
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="items-center text-align-middle">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}