"use client";

import { useState } from "react";
import { Phone, Video, MoreVertical, Plus, Smile, Send, ThumbsUp, Heart } from "lucide-react";
import Avatar from "@/components/ui/avatar";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
  mine?: boolean;
  reaction?: { icon: "thumb" | "heart"; count: number };
};

const MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "Sophie Lee",
    text: "Hey everyone! Are we still meeting tomorrow?",
    time: "10:20 AM",
  },
  { id: "m2", sender: "Liam Carter", text: "Yeah, 7pm at the library.", time: "10:21 AM" },
  {
    id: "m3",
    sender: "You",
    text: "I'll bring the notes from today's lecture!",
    time: "10:22 AM",
    mine: true,
    reaction: { icon: "thumb", count: 3 },
  },
  {
    id: "m4",
    sender: "Emma Wilson",
    text: "Perfect! See you all there.",
    time: "10:24 AM",
    reaction: { icon: "heart", count: 2 },
  },
];

type Member = {
  name: string;
  status: "Online" | "Away" | "Offline";
  role?: "Admin";
};

const MEMBERS: Member[] = [
  { name: "Sophie Lee", status: "Online", role: "Admin" },
  { name: "Liam Carter", status: "Online", role: "Admin" },
  { name: "You", status: "Online" },
  { name: "Emma Wilson", status: "Online" },
  { name: "Noah Brown", status: "Away" },
  { name: "Mia Johnson", status: "Offline" },
];

const STATUS_COLOR: Record<Member["status"], string> = {
  Online: "text-success-text",
  Away: "text-amber-400",
  Offline: "text-muted-dim",
};

export default function ChatGroupPage() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  function send() {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        sender: "You",
        text: draft.trim(),
        time: "Now",
        mine: true,
      },
    ]);
    setDraft("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10">
      <section className="grid h-160 w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border-subtle bg-panel shadow-2xl shadow-black/40 sm:grid-cols-[1fr_240px]">
        {/* Chat column */}
        <div className="flex min-h-0 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
            <div className="flex items-center gap-3">
              <Avatar name="Study Group" size="md" />
              <div>
                <p className="text-[15px] font-semibold text-white">
                  Study Group <span>📚</span>
                </p>
                <p className="text-xs text-muted">8 members, 5 online</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-muted">
              <button className="rounded-lg p-2 transition-colors hover:bg-panel-soft hover:text-white">
                <Phone size={17} />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-panel-soft hover:text-white">
                <Video size={17} />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-panel-soft hover:text-white">
                <MoreVertical size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m) =>
              m.mine ? (
                <div key={m.id} className="flex flex-col items-end">
                  <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5">
                    <p className="text-[14px] leading-snug text-white">{m.text}</p>
                    <p className="mt-1 text-right text-[11px] text-white/70">
                      {m.time}
                    </p>
                  </div>
                  {m.reaction && (
                    <div className="mt-1 flex items-center gap-1 rounded-full bg-panel-elevated px-2 py-1 text-xs text-white">
                      {m.reaction.icon === "thumb" ? (
                        <ThumbsUp size={12} className="text-amber-400" />
                      ) : (
                        <Heart size={12} className="text-rose-400" />
                      )}
                      {m.reaction.count}
                    </div>
                  )}
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3">
                  <Avatar name={m.sender} size="sm" />
                  <div className="max-w-[75%]">
                    <p className="mb-1 text-xs font-medium text-muted">{m.sender}</p>
                    <div className="rounded-2xl rounded-tl-sm bg-panel-soft px-4 py-2.5">
                      <p className="text-[14px] leading-snug text-white">{m.text}</p>
                      <p className="mt-1 text-[11px] text-muted-dim">{m.time}</p>
                    </div>
                    {m.reaction && (
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-panel-elevated px-2 py-1 text-xs text-white">
                        {m.reaction.icon === "thumb" ? (
                          <ThumbsUp size={12} className="text-amber-400" />
                        ) : (
                          <Heart size={12} className="text-rose-400" />
                        )}
                        {m.reaction.count}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2.5 border-t border-border-subtle px-4 py-3.5">
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-strong text-muted transition-colors hover:text-white">
              <Plus size={17} />
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border-subtle bg-panel-soft px-3.5 py-2.5">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                className="w-full bg-transparent text-sm text-white placeholder:text-muted-dim focus:outline-none"
              />
              <Smile size={17} className="shrink-0 text-muted-dim" />
            </div>
            <button
              onClick={send}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
            >
              <Send size={15} />
            </button>
          </div>
        </div>

        {/* Members column */}
        <div className="flex min-h-0 flex-col border-t border-border-subtle sm:border-t-0 sm:border-l">
          <div className="border-b border-border-subtle px-5 py-4">
            <p className="text-[15px] font-semibold text-white">
              Members ({MEMBERS.length})
            </p>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-3">
            {MEMBERS.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-panel-soft"
              >
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{m.name}</p>
                  <p className={`text-xs ${STATUS_COLOR[m.status]}`}>{m.status}</p>
                </div>
                {m.role && (
                  <span className="shrink-0 rounded-md border border-border-strong px-2 py-0.5 text-[11px] font-medium text-muted">
                    {m.role}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}