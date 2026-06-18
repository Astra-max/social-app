"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Lock,
  Globe2,
  Users,
} from "lucide-react";

type Group = {
  id: string;
  name: string;
  emoji: string;
  members: string;
  privacy: "Public" | "Private";
  image: string;
};

const GROUPS: Group[] = [
  {
    id: "photography",
    name: "Photography Lovers",
    emoji: "📸",
    members: "1.8K members",
    privacy: "Public",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
  },
  {
    id: "travel",
    name: "Travel The World",
    emoji: "✈️",
    members: "2.3K members",
    privacy: "Public",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=300&q=80",
  },
  {
    id: "books",
    name: "Book Club",
    emoji: "📚",
    members: "986 members",
    privacy: "Private",
    image:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&q=80",
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    emoji: "💪",
    members: "1.2K members",
    privacy: "Public",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80",
  },
  {
    id: "gaming",
    name: "Game Night",
    emoji: "🎮",
    members: "745 members",
    privacy: "Private",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80",
  },
];

export default function GroupsPage() {
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  const filteredGroups = useMemo(() => {
    return GROUPS.filter((group) =>
      group.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <main className="h-full w-full px-8 py-6">
      <section className="flex h-full w-full flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Groups
            </h1>

            <p className="mt-1 text-sm text-muted">
              Discover and join communities.
            </p>
          </div>

          <button
            className="
              flex items-center gap-2
              rounded-xl
              bg-(--primary-theme)
              px-5 py-2.5
              text-sm font-semibold
              text-white
              transition-opacity
              hover:opacity-90
            "
          >
            <Plus size={16} />
            Create Group
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div
            className="
              flex max-w-md items-center gap-3
              rounded-xl
              border border-white/10
              bg-(--fade-background)
              px-4 py-3
            "
          >
            <Search
              size={18}
              className="text-muted-dim"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search groups..."
              className="
                w-full
                bg-transparent
                text-sm
                text-white
                placeholder:text-muted-dim
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* Group List */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {filteredGroups.map((group) => {
              const isJoined = joined[group.id];

              return (
                <div
                  key={group.id}
                  className="
                    flex items-center gap-5
                    rounded-2xl
                    border border-white/10
                    bg-panel-soft
                    p-5
                    transition-colors duration-200
                    hover:bg-(--fade-background)
                  "
                >
                  {/* Thumbnail */}
                  <img
                    src={group.image}
                    alt={group.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-white">
                      {group.name} {group.emoji}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <Users size={14} />

                      <span>{group.members}</span>

                      <span className="text-muted-dim">•</span>

                      <span className="inline-flex items-center gap-1">
                        {group.privacy === "Public" ? (
                          <Globe2 size={13} />
                        ) : (
                          <Lock size={13} />
                        )}

                        {group.privacy}
                      </span>
                    </div>
                  </div>

                  {/* Join Button */}
                  <button
                    onClick={() =>
                      setJoined((prev) => ({
                        ...prev,
                        [group.id]: !prev[group.id],
                      }))
                    }
                    className={
                      isJoined
                        ? `
                          min-w-24
                          rounded-xl
                          border border-white/10
                          px-4 py-2.5
                          text-sm font-semibold
                          text-muted
                          transition-colors
                          hover:text-white
                        `
                        : `
                          min-w-24
                          rounded-xl
                          bg-(--primary-theme)
                          px-4 py-2.5
                          text-sm font-semibold
                          text-white
                          transition-opacity
                          hover:opacity-90
                        `
                    }
                  >
                    {isJoined ? "Joined" : "Join"}
                  </button>
                </div>
              );
            })}

            {filteredGroups.length === 0 && (
              <div className="py-16 text-center text-muted">
                No groups found for "{query}"
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}