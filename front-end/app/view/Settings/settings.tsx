"use client";

import { useState } from "react";
import {
  User,
  UserCircle,
  ShieldCheck,
  Bell,
  PaintBucket,
  ShieldAlert,
  Ban,
  Home,
  Languages,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "account", label: "Account", icon: User },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "privacy", label: "Privacy", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: PaintBucket },
  { id: "security", label: "Security", icon: ShieldAlert },
  { id: "blocked", label: "Blocked Users", icon: Ban },
  { id: "language", label: "Language", icon: Languages },
  { id: "help", label: "Help & Support", icon: HelpCircle },
] as const;

const tabButtonClass = (active: boolean) =>
  active ? "text-[#14afa7] font-bold" : "text-white";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [privateProfile, setPrivateProfile] = useState(true);

  const router = useRouter();

  return (
    <div className="w-full h-screen bg-[#181818]">
      <div className="grid h-full grid-cols-1 sm:grid-cols-[340px_1fr]">
        {/* Sidebar */}
        <nav className="flex h-full min-h-screen flex-col bg-[#202020] p-5">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-[#14afa7]">
            Settings
          </h1>

          <ul className="flex flex-col gap-6">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <li key={tab.id}>
                  <button
                    onClick={() => {
                      if (tab.id === "home") {
                        router.push("/view/Home");
                        return;
                      }

                      setActiveTab(tab.id);
                    }}
                    className={`flex w-full items-center gap-2 py-3 text-left text-[15px] font-medium cursor-pointer ${tabButtonClass(
                      active
                    )}`}
                  >
                    <Icon size={20} strokeWidth={2} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-10">
            <button className="inline-flex items-center gap-2 text-base text-white">
              <LogOut className="text-red-500" size={20} strokeWidth={2} />
              Logout
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="h-full overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {/* Appearance */}
            <div className="rounded-3xl border border-[#2d2d2d] bg-[#222222]">
              <h2 className="px-6 py-4 text-base font-semibold text-white">
                Appearance
              </h2>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-sm font-medium text-white">Theme</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Choose your preferred theme.
                  </p>
                </div>

                <div className="flex w-72 rounded-lg bg-[#111] p-1">
                  {(["light", "dark"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition ${
                        theme === t
                          ? "bg-[--primary-theme] text-white"
                          : "text-gray-400 hover:bg-[--primary-theme] hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Privacy */}
            <div className="rounded-3xl border border-[#2d2d2d] bg-[#222222]">
              <h2 className="px-6 py-4 text-base font-semibold text-white">
                Profile Privacy
              </h2>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-sm font-medium text-white">
                    Private Profile
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Only approved followers can see your posts.
                  </p>
                </div>

                <button
                  role="switch"
                  aria-checked={privateProfile}
                  onClick={() => setPrivateProfile((prev) => !prev)}
                  className={`relative h-7 w-12 rounded-full transition ${
                    privateProfile ? "bg-[--primary-theme]" : "bg-[#111]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
                      privateProfile
                        ? "translate-x-[22px]"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Account */}
            <div className="rounded-3xl border border-[#2d2d2d] bg-[#222222]">
              <h2 className="px-6 py-4 text-base font-semibold text-white">
                Account
              </h2>

              <div>
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="mt-1 text-xs text-gray-400">
                      jane.doe@example.com
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-[--primary-theme]">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Current Password
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      ••••••••••
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-[--primary-theme]">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-sm font-medium text-white">
                      New Password
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      ••••••••••
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-[--primary-theme]">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <p className="text-sm font-medium text-red-400">
                      Delete Account
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Permanently delete your account.
                    </p>
                  </div>

                  <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}