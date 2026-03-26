import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TZ = "America/New_York" as const;

/** "Saturday, Apr 5 at 10:00 AM ET" */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long", timeZone: TZ });
  const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ });
  return `${weekday}, ${monthDay} at ${time} ET`;
}

/** "Apr 5, 10:00 AM" */
export function formatShortDateTime(iso: string): string {
  const d = new Date(iso);
  const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ });
  return `${monthDay}, ${time}`;
}

/** "in 3 days" / "in 4 hours" / "in 15 min" / "imminent" */
export function getRelativeTime(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "imminent";

  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `in ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `in ${hours}h`;

  const days = Math.floor(hours / 24);
  return `in ${days}d`;
}
