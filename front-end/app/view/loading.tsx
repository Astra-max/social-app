"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#181818]">
      <div className="flex gap-3">
        <span className="h-5 w-5 rounded-full bg-(--primary-theme) animate-bounce [animation-delay:0ms]" />
        <span className="h-5 w-5 rounded-full bg-(--primary-theme) animate-bounce [animation-delay:150ms]" />
        <span className="h-5 w-5 rounded-full bg-(--primary-theme) animate-bounce [animation-delay:300ms]" />
        <span className="h-5 w-5 rounded-full bg-(--primary-theme) animate-bounce [animation-delay:450ms]" />
      </div>
    </div>
  );
}