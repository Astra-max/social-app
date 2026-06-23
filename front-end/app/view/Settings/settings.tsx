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
import Toggle from "@/components/ui/toggle";

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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [toggleTheme, setToggleTheme] = useState(true);
  const [checked1, setChecked1] = useState<boolean>(false)

  const router = useRouter();

  return (
    <div className="h-screen w-full bg-[#181818]">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[550px_1fr]">

        {/* Sidebar */}
        <nav className="flex h-full flex-col border-r border-[#2d2d2d] bg-[#202020] px-7 py-6">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#14afa7]">
            Settings
          </h1>

          <ul className="flex flex-col gap-2">
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
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-medium transition ${active
                      ? "bg-[#14afa7]/10 text-[#14afa7]"
                      : "text-white hover:bg-[#2a2a2a]"
                      }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-8">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white transition hover:bg-[#2a2a2a]">
              <LogOut className="text-red-500" size={20} />
              Logout
            </button>
          </div>
        </nav>

        {/* Content */}
        <div className="h-full w-full overflow-y-auto px-8 py-6 space-y-6">

          {/* Appearance */}
          <div className="rounded-lg border border-[#2d2d2d] bg-[#222222]">
            <h2 className="px-6 py-4 text-base font-semibold text-white">
              Appearance
            </h2>

            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-sm font-medium text-white">Theme</p>
                <p className="mt-1 text-xs text-gray-400">
                  Choose your preferred theme.
                </p>
              </div>
              <Toggle checked={toggleTheme}
               onChange={setToggleTheme}
               label={`${toggleTheme ? "dark" : "light"}`}
               />
            </div>
          </div>

          {/* Profile Privacy */}
          <div className="rounded-lg border border-[#2d2d2d] bg-[#222222]">
            <h2 className="px-6 py-4 text-base font-semibold text-white">
              Profile Privacy
            </h2>

            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <p className="text-sm font-medium text-white">
                  {!checked1 ? "Public" : "Private"} Account
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Only approved followers can see your posts.
                </p>
              </div>
                <Toggle
                  checked={checked1}
                  onChange={setChecked1}
                  label={`${checked1 ? "private" : "public"}`}
                />

            </div>
          </div>

          {/* Account */}
          <div className="rounded-lg border border-[#2d2d2d] bg-[#222222]">
            <h2 className="px-6 py-4 text-base font-semibold text-white">
              Account
            </h2>

            <div className="divide-y divide-[#2d2d2d]">

              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="mt-1 text-xs text-gray-400">
                    jane.doe@example.com
                  </p>
                </div>
                <button className="text-sm font-semibold text-[#14afa7]">
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
                <button className="text-sm font-semibold text-[#14afa7]">
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
                <button className="text-sm font-semibold text-[#14afa7]">
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
                <button className="rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-red-400 cursor-pointer">
                  Delete
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}