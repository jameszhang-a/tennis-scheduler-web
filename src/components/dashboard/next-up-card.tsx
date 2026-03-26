"use client";

import { CalendarClock, MapPin, Clock, AlertTriangle, CalendarX } from "lucide-react";
import { useUpcomingSchedules } from "@/lib/queries/api-queries";
import { formatDateTime, getRelativeTime } from "@/lib/utils";

export default function NextUpCard() {
  const { data, isLoading, isError } = useUpcomingSchedules(30);
  const next = data?.[0];

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Failed to load upcoming schedule</span>
        </div>
      </div>
    );
  }

  if (!next) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Next Up</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-4 text-gray-400 dark:text-gray-500">
          <CalendarX className="w-8 h-8 mb-2" />
          <p className="text-sm">No upcoming bookings</p>
        </div>
      </div>
    );
  }

  const triggerRelative = getRelativeTime(next.trigger_time);

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Next Up</h3>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            next.type === "recurring"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {next.type}
        </span>
      </div>

      <p className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {formatDateTime(next.desired_time)}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Court {next.court_id}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {next.duration} min
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Booking attempt{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {triggerRelative}
          </span>
        </p>
      </div>
    </div>
  );
}
