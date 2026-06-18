"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../auth/login";
import { authSelector, setSession, logout } from "@/store/features/authSlice";
import { Api } from "@/services/axios";
import { setAccessToken } from "@/services/token";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  const [checking, setChecking] = useState(true);

  // SESSION RESTORE (REAL AUTH CHECK)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await Api.post("/auth/refresh");

        const { accessToken, user } = res.data;

        setAccessToken(accessToken);
        dispatch(setSession({ user }));
      } catch (err) {
        dispatch(logout());
        setAccessToken(null);
      } finally {
        setChecking(false);
      }
    };

    initAuth();
  }, [dispatch]);

  //  PREVENT FLICKER
  if (checking) return null;

  const isAuth = isAuthenticated;

  return (
    <div className="w-full relative min-h-screen">
      {/* YOUR ORIGINAL STYLE LOGIC KEPT */}
      <div className={isAuth ? "" : "blur-sm pointer-events-none"}>
        {children}
      </div>

      {/* LOGIN OVERLAY (UNCHANGED STYLE STRUCTURE) */}
      {!isAuth && (
        <div className="w-full fixed inset-0 z-9999 flex items-center justify-center bg-black/10 backdrop-blur-md">
          <div className="pointer-events-auto">
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}