"use client";

import { useState } from "react";
import { Plus, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

type EventItem = {
  id: string;
  title: string;
  image: string;
  month: string;
  day: string;
  weekday: string;
  dateLabel: string;
  location: string;
  attendees: string[];
  extra: number;
};

const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Summer Beach Meetup ☀️",
    image: "/events/beach.jpg",
    month: "JUN",
    day: "10",
    weekday: "SAT",
    dateLabel: "Saturday, June 10 · 2:00 PM",
    location: "Santa Monica Beach, CA",
    attendees: [
      "/users/user1.jpg",
      "/users/user2.jpg",
      "/users/user3.jpg",
      "/users/user4.jpg",
    ],
    extra: 24,
  },
  {
    id: "2",
    title: "Mountain Hiking Adventure 🥾",
    image: "/events/mountain.jpg",
    month: "JUN",
    day: "24",
    weekday: "SAT",
    dateLabel: "Saturday, June 24 · 8:00 AM",
    location: "Runyon Canyon, CA",
    attendees: [
      "/users/user5.jpg",
      "/users/user6.jpg",
      "/users/user2.jpg",
      "/users/user1.jpg",
    ],
    extra: 15,
  },
  {
    id: "3",
    title: "Board Game Night 🎲",
    image: "/events/boardgame.jpg",
    month: "JUL",
    day: "08",
    weekday: "SAT",
    dateLabel: "Saturday, July 8 · 7:00 PM",
    location: "The Game Lounge, LA",
    attendees: [
      "/users/user3.jpg",
      "/users/user7.jpg",
      "/users/user5.jpg",
    ],
    extra: 8,
  },
];

const TABS = ["Upcoming", "Going", "Invites", "Past"] as const;

export default function EventsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const [rsvp, setRsvp] =
    useState<Record<string, "going" | "not-going">>({});

  return (
    <div className="h-full w-full px-8 py-6">
      <div className="flex h-full w-full flex-col">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
            Events
          </h1>

          <button className="flex items-center gap-2 rounded-xl bg-(--primary-theme) px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <Plus size={18} />
            Create Event
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-8 border-b border-white/10 pb-3">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`font-medium transition ${
                tab === item
                  ? "text-white border-b-2 border-(--primary-theme)"
                  : "text-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="flex-1 space-y-4 overflow-y-auto">

          {EVENTS.map((event) => {
            const choice = rsvp[event.id];

            return (
              <div
                key={event.id}
                className="
                  flex items-center gap-5
                  min-h-26
                  rounded-2xl
                  border border-white/10
                  bg-white/3
                  p-5
                  transition-colors duration-200
                  hover:bg-(--fade-background)
                "
              >

                {/* Image */}
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={event.image}
                    fill
                    alt={event.title}
                    className="object-cover"
                  />
                </div>

                {/* Date */}
                <div className="flex w-16 shrink-0 flex-col items-center justify-center">
                  <p className="text-xs font-semibold text-muted">
                    {event.month}
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    {event.day}
                  </h2>

                  <p className="text-xs text-muted">
                    {event.weekday}
                  </p>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-white">
                    {event.title}
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <CalendarDays size={14} />
                    {event.dateLabel}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={14} />
                    {event.location}
                  </div>

                  {/* Attendees */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {event.attendees.map((person, i) => (
                        <div
                          key={i}
                          className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-black"
                        >
                          <Image
                            src={person}
                            fill
                            alt=""
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <span className="text-sm text-muted">
                      +{event.extra}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() =>
                      setRsvp((prev) => ({
                        ...prev,
                        [event.id]: "going",
                      }))
                    }
                    className={`min-w-24 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      choice === "going"
                        ? "bg-(--primary-theme) text-white"
                        : "border border-white/10 text-muted hover:text-white"
                    }`}
                  >
                    Going
                  </button>

                  <button
                    onClick={() =>
                      setRsvp((prev) => ({
                        ...prev,
                        [event.id]: "not-going",
                      }))
                    }
                    className={`min-w-24 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      choice === "not-going"
                        ? "bg-(--primary-theme) text-white"
                        : "border border-white/10 text-muted hover:text-white"
                    }`}
                  >
                    Not Going
                  </button>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}