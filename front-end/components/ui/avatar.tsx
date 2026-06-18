const GRADIENTS = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-violet-500",
  "from-amber-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-violet-500",
  "from-indigo-500 to-sky-400",
];

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SIZE_MAP = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

export default function Avatar({
  name,
  size = "md",
  ring = false,
  className = "",
}: {
  name: string;
  size?: keyof typeof SIZE_MAP;
  ring?: boolean;
  className?: string;
}) {
  const gradient = GRADIENTS[hashName(name) % GRADIENTS.length];
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradient} font-semibold text-white ${SIZE_MAP[size]} ${
        ring ? "ring-2 ring-app-bg" : ""
      } ${className}`}
    >
      {initials(name)}
    </div>
  );
}
