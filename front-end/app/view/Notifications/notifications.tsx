"use client";

import { useState } from "react";
import Avatar from "@/components/ui/avatar";

type Notification = {
  id: string;
  name: string;
  action: React.ReactNode;
  time: string;
  kind: "follow-request" | "group-invite" | "event-invite" | "like";
  thumbSeed?: string;
  thumbEmoji?: string;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    name: "Alex Morgan",
    action: "requested to follow you.",
    time: "2m ago",
    kind: "follow-request",
  },
  {
    id: "n2",
    name: "Sophie Lee",
    action: (
      <>
        invited you to join the group{" "}
        <span className="font-semibold text-white">Photography Lovers 📷</span>.
      </>
    ),
    time: "10m ago",
    kind: "group-invite",
  },
  {
    id: "n3",
    name: "Liam Carter",
    action: (
      <>
        invited you to an event{" "}
        <span className="font-semibold text-white">Summer Beach Meetup ☀️</span>
      </>
    ),
    time: "1h ago",
    kind: "event-invite",
  },
  {
    id: "n4",
    name: "Emma Wilson",
    action: "liked your post.",
    time: "2h ago",
    kind: "like",
    thumbSeed: "sunset-post",
  },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [handled, setHandled] = useState<Record<string, "accepted" | "declined">>({});

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-border-subtle bg-panel p-6 shadow-2xl shadow-black/40 sm:p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Notifications
          </h1>
          <button
            onClick={() => setItems([])}
            className="text-sm font-medium text-primary transition-colors hover:text-violet-300"
          >
            Mark all as read
          </button>
        </div>

        <div className="mt-4 divide-y divide-border-subtle">
          {items.map((n) => (
            <div key={n.id} className="flex items-start gap-3.5 py-4">
              <Avatar name={n.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] leading-snug text-white">
                  <span className="font-semibold">{n.name}</span>{" "}
                  <span className="text-muted">{n.action}</span>
                </p>
                <p className="mt-1 text-xs text-primary/80">{n.time}</p>
              </div>

              <div className="shrink-0 pt-0.5">
                {n.kind === "follow-request" &&
                  (handled[n.id] ? (
                    <span className="text-xs font-medium text-muted">
                      {handled[n.id] === "accepted" ? "Accepted" : "Declined"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setHandled((p) => ({ ...p, [n.id]: "accepted" }))
                        }
                        className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          setHandled((p) => ({ ...p, [n.id]: "declined" }))
                        }
                        className="rounded-lg border border-border-strong px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-panel-soft"
                      >
                        Decline
                      </button>
                    </div>
                  ))}

                {(n.kind === "group-invite" || n.kind === "event-invite") && (
                  <button className="rounded-lg bg-panel-elevated px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-border-strong">
                    View
                  </button>
                )}
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">
              You&rsquo;re all caught up.
            </p>
          )}
        </div>

        <button className="mt-3 w-full pt-2 text-center text-sm font-medium text-primary transition-colors hover:text-violet-300">
          View all notifications
        </button>
      </section>
    </main>
  );
}