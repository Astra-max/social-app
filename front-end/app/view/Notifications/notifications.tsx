"use client";

import { useState } from "react";
import Avatar from "@/components/ui/avatar";

type Notification = {
id: string;
name: string;
action: React.ReactNode;
time: string;
kind: "follow-request" | "group-invite" | "event-invite" | "like";
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
invited you to join the group{" "} <span className="font-semibold text-white">
Photography Lovers 📷 </span>
.
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
invited you to an event{" "} <span className="font-semibold text-white">
Summer Beach Meetup ☀️ </span>
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
},
];

export default function NotificationsPage() {
const [items, setItems] = useState(NOTIFICATIONS);

const [handled, setHandled] = useState<
Record<string, "accepted" | "declined">

> ({});

return ( <div className="flex h-screen w-full flex-col overflow-y-auto bg-[#181818]">
{/* Header */} <div className="sticky top-0 z-20 border-b border-[#2a2a2a] bg-[#181818]/95 px-6 py-5 backdrop-blur"> <div className="flex items-center justify-between"> <h1 className="text-2xl font-bold text-white">
Notifications </h1>

```
      <button
        onClick={() => setItems([])}
        className="text-sm font-medium text-[--primary-theme] transition-opacity hover:opacity-80"
      >
        Mark all as read
      </button>
    </div>
  </div>

  {/* Notifications */}
  <div className="flex-1 px-6">
    <div className="divide-y divide-[#2a2a2a]">
      {items.map((n) => (
        <div
          key={n.id}
          className="flex items-start gap-4 py-5 transition-colors hover:bg-white/[0.02]"
        >
          <Avatar name={n.name} size="md" />

          <div className="min-w-0 flex-1">
            <p className="text-sm leading-relaxed text-white">
              <span className="font-semibold">{n.name}</span>{" "}
              <span className="text-gray-400">{n.action}</span>
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {n.time}
            </p>
          </div>

          <div className="shrink-0">
            {/* Follow Request */}
            {n.kind === "follow-request" &&
              (handled[n.id] ? (
                <span
                  className={`text-sm font-semibold ${
                    handled[n.id] === "accepted"
                      ? "text-[#14afa7]"
                      : "text-red-500"
                  }`}
                >
                  {handled[n.id] === "accepted"
                    ? "Accepted"
                    : "Declined"}
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setHandled((prev) => ({
                        ...prev,
                        [n.id]: "accepted",
                      }))
                    }
                    className="rounded-lg bg-[#14afa7] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      setHandled((prev) => ({
                        ...prev,
                        [n.id]: "declined",
                      }))
                    }
                    className="rounded-lg border border-[#3a3a3a] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#242424]"
                  >
                    Decline
                  </button>
                </div>
              ))}

            {/* Group / Event Invite */}
            {(n.kind === "group-invite" ||
              n.kind === "event-invite") && (
              <button className="rounded-lg bg-[#262626] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#333]">
                View
              </button>
            )}

            {/* Like */}
            {n.kind === "like" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600">
                ❤️
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {items.length === 0 && (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          You're all caught up.
        </p>
      </div>
    )}

    {/* Footer */}
    {items.length > 0 && (
      <div className="py-6">
        <button className="w-full rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] py-3 text-sm font-medium text-[--primary-theme] transition hover:bg-[#262626]">
          View all notifications
        </button>
      </div>
    )}
  </div>
</div>
);
}
