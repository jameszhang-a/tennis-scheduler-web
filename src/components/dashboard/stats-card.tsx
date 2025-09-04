"use client";

import { BarChart3, TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import { useStats } from "@/lib/queries/api-queries";

export default function StatsCard() {
  const { data: stats, isLoading, isError, error } = useStats();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Failed to load statistics</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-blue-500" />
        <h3 className="font-medium text-gray-900 dark:text-white">
          Quick Stats
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            {stats?.successful_schedules || 0}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Successful</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
            <Calendar className="w-5 h-5" />
            {stats?.pending_schedules || 0}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
        </div>
      </div>

      {stats?.total_schedules && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Total: {stats.total_schedules} schedules
          </p>
        </div>
      )}
    </div>
  );
}
