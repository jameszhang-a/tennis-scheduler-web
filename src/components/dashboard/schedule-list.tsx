"use client";

import { useState } from "react";
import {
  CalendarRange,
  AlertTriangle,
  CalendarX,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { useSchedules, useCancelSchedule } from "@/lib/queries/api-queries";
import { formatShortDateTime, getRelativeTime } from "@/lib/utils";
import type { Schedule } from "@/lib/types";
import Link from "next/link";

function ScheduleRow({
  schedule,
  cancellingId,
  onCancelClick,
  onCancelConfirm,
  onCancelBack,
  isMutating,
}: {
  schedule: Schedule;
  cancellingId: number | null;
  onCancelClick: (id: number) => void;
  onCancelConfirm: (id: number) => void;
  onCancelBack: () => void;
  isMutating: boolean;
}) {
  const isConfirming = cancellingId === schedule.id;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1A1A1F] transition-colors">
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatShortDateTime(schedule.desired_time)}
          </p>
          <span
            className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
              schedule.type === "recurring"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {schedule.type}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Court {schedule.court_id}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {schedule.duration} min
          </span>
          <span>
            Attempt {getRelativeTime(schedule.trigger_time)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isConfirming ? (
          <>
            <button
              onClick={() => onCancelConfirm(schedule.id)}
              disabled={isMutating}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isMutating && <Loader2 className="w-3 h-3 animate-spin" />}
              Confirm?
            </button>
            <button
              onClick={onCancelBack}
              disabled={isMutating}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Back
            </button>
          </>
        ) : (
          <button
            onClick={() => onCancelClick(schedule.id)}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function ScheduleList() {
  const { data: schedules, isLoading, isError } = useSchedules({ status: "pending" });
  const cancelMutation = useCancelSchedule();
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const handleCancelConfirm = (id: number) => {
    cancelMutation.mutate(id, {
      onSuccess: () => setCancellingId(null),
      onError: () => setCancellingId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Failed to load schedules</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarRange className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Pending Schedules
          </h3>
          {schedules && schedules.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({schedules.length})
            </span>
          )}
        </div>
      </div>

      {!schedules || schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
          <CalendarX className="w-8 h-8 mb-2" />
          <p className="text-sm mb-1">No pending schedules</p>
          <Link
            href="/schedules"
            className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Create a schedule
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {schedules.map((schedule) => (
            <ScheduleRow
              key={schedule.id}
              schedule={schedule}
              cancellingId={cancellingId}
              onCancelClick={(id) => setCancellingId(id)}
              onCancelConfirm={handleCancelConfirm}
              onCancelBack={() => setCancellingId(null)}
              isMutating={cancelMutation.isPending && cancellingId === schedule.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
