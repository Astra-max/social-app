"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Bookmark,
  Heart,
  MessageCircle,
  MapPin,
  Link2,
  Calendar,
} from "lucide-react";


type Tab = "Posts" | "About" | "Photos" | "Saved";

type Post = {
  id: string;
  gradient: string;
  emoji: string;
  caption: string;
  likes: number;
  comments: number;
  saved?: boolean;
};


const POSTS: Post[] = [
  {
    id: "p1",
    gradient: "from-slate-900 via-purple-900 to-slate-800",
    emoji: "☕",
    caption: "Golden hour in the city ✨",
    likes: 128,
    comments: 14,
  },
  {
    id: "p2",
    gradient: "from-indigo-900 via-violet-800 to-fuchsia-900",
    emoji: "🌅",
    caption: "Sunset hikes never get old 🏔️",
    likes: 214,
    comments: 32,
  },
  {
    id: "p3",
    gradient: "from-amber-900 via-orange-800 to-rose-900",
    emoji: "🎵",
    caption: "Live music tonight 🎶",
    likes: 97,
    comments: 8,
  },
  {
    id: "p4",
    gradient: "from-emerald-900 via-teal-800 to-cyan-900",
    emoji: "🐕",
    caption: "Weekend adventures with my pup 🌿",
    likes: 305,
    comments: 41,
  },
  {
    id: "p5",
    gradient: "from-rose-900 via-pink-800 to-purple-900",
    emoji: "🌸",
    caption: "Cherry blossom season 🌺",
    likes: 189,
    comments: 22,
  },
  {
    id: "p6",
    gradient: "from-sky-900 via-blue-800 to-indigo-900",
    emoji: "🌊",
    caption: "Ocean therapy 🐚",
    likes: 246,
    comments: 19,
  },
];

const SAVED_POSTS: Post[] = [
  {
    id: "s1",
    gradient: "from-violet-900 via-purple-800 to-fuchsia-900",
    emoji: "🏙️",
    caption: "City lights never sleep",
    likes: 432,
    comments: 57,
    saved: true,
  },
  {
    id: "s2",
    gradient: "from-teal-900 via-emerald-800 to-green-900",
    emoji: "🌲",
    caption: "Forest bathing weekend",
    likes: 198,
    comments: 28,
    saved: true,
  },
];

const ABOUT = {
  bio: "Coffee lover ☕ | Music enthusiast 🎵 | Traveler ✈️\nLiving life one adventure at a time ✨",
  location: "Los Angeles, CA",
  website: "janedoe.me",
  joined: "March 2019",
};


function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(post.saved ?? false);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#222]">
      {/* image placeholder */}
      <div
        className={`relative h-52 w-full bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
        <span className="relative text-5xl drop-shadow-lg">{post.emoji}</span>

        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <Heart size={17} className="fill-white" />
            {post.likes + (liked ? 1 : 0)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <MessageCircle size={17} className="fill-white" />
            {post.comments}
          </span>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <p className="truncate text-[13px] text-gray-300">{post.caption}</p>
        <div className="flex shrink-0 items-center gap-2 pl-2">
          <button
            onClick={() => setLiked((v) => !v)}
            className="transition-transform active:scale-90"
          >
            <Heart
              size={15}
              className={liked ? "fill-rose-500 text-rose-500" : "text-gray-500 hover:text-rose-400"}
            />
          </button>
          <button
            onClick={() => setBookmarked((v) => !v)}
            className="transition-transform active:scale-90"
          >
            <Bookmark
              size={15}
              className={bookmarked ? "fill-[--primary-theme] text-[--primary-theme]" : "text-gray-500 hover:text-[--primary-theme]"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ post }: { post: Post }) {
  return (
    <div
      className={`group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br ${post.gradient} cursor-pointer`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
      <span className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg">
        {post.emoji}
      </span>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="truncate text-xs font-medium text-white">{post.caption}</p>
      </div>
    </div>
  );
}


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Posts");
  const [isPrivate, setIsPrivate] = useState(false);
  const [followersCount] = useState(1200);

  const TABS: Tab[] = ["Posts", "About", "Photos", "Saved"];

  const STATS = [
    { label: "Posts", value: "24" },
    { label: "Followers", value: "1.2K" },
    { label: "Following", value: "356" },
  ];

  return (
    <div className="flex h-screen w-full flex-col overflow-y-auto bg-[#181818] pr-20">

      {/* ── cover ── */}
      <div className="relative h-60 w-full shrink-0 overflow-hidden sm:h-70">
        {/* gradient cover image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(139,92,252,0.35),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(30,20,80,0.6),transparent_60%)]" />
          {/* mountain silhouette */}
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-40 w-full opacity-40"
          >
            <polygon points="0,200 0,120 180,40 320,90 500,10 680,70 850,30 1020,80 1200,50 1200,200" fill="#1e1040" />
            <polygon points="0,200 0,150 150,80 280,110 420,50 580,100 720,60 900,90 1100,70 1200,90 1200,200" fill="#0f0828" />
          </svg>
        </div>

        {/* top-right action buttons */}
        <div className="absolute right-4 top-5 flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/50">
            <Pencil size={14} />
            Edit Profile
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-xl border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50">
            <MoreHorizontal size={17} />
          </button>
          {/* private profile toggle */}
          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/80">Private Profile</span>
            <button
              role="switch"
              aria-checked={isPrivate}
              onClick={() => setIsPrivate((v) => !v)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                isPrivate ? "bg-[--primary-theme]" : "bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  isPrivate ? "translate-x-[17px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── avatar + identity ── */}
      <div className="w-full bg-[#1e1e1e] px-6 pb-5 pt-0">
        {/* avatar overlaps cover */}
        <div className="-mt-14 mb-4 flex items-end justify-between">
          <div className="relative h-28 w-28 shrink-0 rounded-full border-4 border-[#1e1e1e] bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl">
            {/* avatar gradient placeholder */}
            <div className="flex h-full w-full items-center justify-center rounded-full text-3xl font-bold text-white">
              JD
            </div>
            {/* online dot */}
            <span className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-2 border-[#1e1e1e] bg-emerald-400" />
          </div>
        </div>

        {/* name + handle */}
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-2xl font-bold text-white">Jane Doe</h1>
          <span className="text-sm text-gray-500">@jane_doe</span>
        </div>

        {/* bio */}
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Coffee lover ☕ | Music enthusiast 🎵 | Traveler ✈️<br />
          Living life one adventure at a time ✨
        </p>

        {/* stats row */}
        <div className="mt-4 flex gap-7">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── tabs ── */}
      <div className="sticky top-0 z-10 flex gap-0 border-b border-[#2a2a2a] bg-[#181818] px-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-3.5 text-sm font-medium transition-colors ${
              activeTab === tab ? "text-[#14afa7]" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[--primary-theme]" />
            )}
          </button>
        ))}
      </div>

      {/* ── tab content ── */}
      <div className="flex-1 p-6">

        {/* Posts */}
        {activeTab === "Posts" && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* About */}
        {activeTab === "About" && (
          <div className="mx-auto max-w-xl space-y-5">
            <div className="rounded-2xl bg-[#222] p-5">
              <h2 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Bio</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300">
                {ABOUT.bio}
              </p>
            </div>

            <div className="rounded-2xl bg-[#222] p-5 space-y-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Details</h2>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin size={16} className="shrink-0 text-[--primary-theme]" />
                {ABOUT.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Link2 size={16} className="shrink-0 text-[--primary-theme]" />
                <a href="#" className="text-[--primary-theme] hover:underline">
                  {ABOUT.website}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Calendar size={16} className="shrink-0 text-[--primary-theme]" />
                Joined {ABOUT.joined}
              </div>
            </div>

            <div className="rounded-2xl bg-[#222] p-5">
              <h2 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Privacy</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Private Account</p>
                  <p className="mt-0.5 text-xs text-gray-500">Only approved followers can see your posts</p>
                </div>
                <button
                  role="switch"
                  aria-checked={isPrivate}
                  onClick={() => setIsPrivate((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    isPrivate ? "bg-[--primary-theme]" : "bg-[#111]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      isPrivate ? "translate-x-[20px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photos */}
        {activeTab === "Photos" && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {[...POSTS, ...SAVED_POSTS].map((post) => (
              <PhotoCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Saved */}
        {activeTab === "Saved" && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {SAVED_POSTS.length > 0 ? (
              SAVED_POSTS.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="col-span-full py-16 text-center text-sm text-gray-500">
                No saved posts yet.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}