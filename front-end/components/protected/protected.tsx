"use client";

import { useAppSelector } from "@/store/hooks";
import { authSelector } from "@/store/features/authSlice";
import Login from "../auth/login";
import RegisterUI from "../auth/register";
import { useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector(authSelector);
  const [register, setRegister] = useState(false);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-[9999]">
      {register ? (
        <RegisterUI setRegister={setRegister} />
      ) : (
        <Login setRegister={setRegister} />
      )}
    </div>
  );
}