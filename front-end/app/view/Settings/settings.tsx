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
  Languages,
  HelpCircle,
} from "lucide-react";

const TABS = [
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
  const [activeTab, setActiveTab] = useState<string>("account");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [privateProfile, setPrivateProfile] = useState(true);

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10">
      <section className="grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl border border-border-subtle bg-panel shadow-2xl shadow-black/40 sm:grid-cols-[200px_1fr]">
        {/* Tabs */}
        <nav className="border-b border-border-subtle p-4 sm:border-b-0 sm:border-r sm:p-5">
          <h1 className="mb-3 px-2 text-xl font-bold tracking-tight text-white">
            Settings
          </h1>
          <ul className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <li key={tab.id} className="shrink-0">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/90 text-white"
                        : "text-muted hover:bg-panel-soft hover:text-white"
                    }`}
                  >
                    <Icon size={16} strokeWidth={2} />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content */}
        <div className="space-y-5 p-5 sm:p-6">
          {/* Appearance */}
          <div className="rounded-2xl border border-border-subtle bg-panel-soft">
            <h2 className="border-b border-border-subtle px-5 py-3.5 text-[15px] font-semibold text-white">
              Appearance
            </h2>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">Theme</p>
                <p className="mt-0.5 text-xs text-muted">
                  Choose your preferred theme.
                </p>
              </div>
              <div className="flex rounded-lg border border-border-strong p-0.5">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                      theme === t
                        ? "bg-primary/90 text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Privacy */}
          <div className="rounded-2xl border border-border-subtle bg-panel-soft">
            <h2 className="border-b border-border-subtle px-5 py-3.5 text-[15px] font-semibold text-white">
              Profile Privacy
            </h2>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">Private Profile</p>
                <p className="mt-0.5 text-xs text-muted">
                  Only approved followers can see your posts
                </p>
              </div>
              <button
                role="switch"
                aria-checked={privateProfile}
                onClick={() => setPrivateProfile((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  privateProfile ? "bg-primary" : "bg-border-strong"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    privateProfile ? "translate-x-[20px]" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-2xl border border-border-subtle bg-panel-soft">
            <h2 className="border-b border-border-subtle px-5 py-3.5 text-[15px] font-semibold text-white">
              Account
            </h2>
            <div className="divide-y divide-border-subtle">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <p className="mt-0.5 text-xs text-muted">jane.doe@example.com</p>
                </div>
                <button className="text-sm font-semibold text-primary hover:text-violet-300">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">Password</p>
                  <p className="mt-0.5 text-xs text-muted">••••••••••</p>
                </div>
                <button className="text-sm font-semibold text-primary hover:text-violet-300">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-danger">Delete Account</p>
                  <p className="mt-0.5 text-xs text-muted">
                    Permanently delete your account
                  </p>
                </div>
                <button className="rounded-lg bg-danger-bg px-3.5 py-1.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}