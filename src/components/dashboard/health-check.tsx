"use client";

import { Activity, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import {
  useHealthCheck,
  useRefreshHealthCheck,
} from "@/lib/queries/api-queries";
import { ApiError } from "@/lib/api";

export default function HealthCheck() {
  const {
    data: health,
    isLoading,
    error,
    isError,
    dataUpdatedAt,
  } = useHealthCheck();

  const refreshMutation = useRefreshHealthCheck();

  const getStatusIcon = () => {
    if (isLoading && !health) {
      return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
    }

    if (isError || !health) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }

    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getStatusText = () => {
    if (isLoading && !health) return "Checking...";
    if (isError || !health) return "Connection Failed";
    if (health?.status === "healthy") return "API Online";
    return health?.status || "Unknown";
  };

  const getStatusColor = () => {
    if (isLoading && !health) return "text-blue-600 dark:text-blue-400";
    if (isError || !health) return "text-red-600 dark:text-red-400";
    return "text-green-600 dark:text-green-400";
  };

  const getErrorMessage = () => {
    if (!isError || !error) return null;

    if (error instanceof ApiError) {
      return `${error.message} (${error.status || "Network Error"})`;
    }

    return "Failed to fetch health status";
  };

  const formatTimestamp = (timestamp?: string | number) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString();
  };

  const handleRefresh = () => {
    refreshMutation.mutate();
  };

  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            {getErrorMessage() && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                {getErrorMessage()}
              </p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {health?.service || "Backend Status"}
          </p>
          {(health?.timestamp || dataUpdatedAt) && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {formatTimestamp(health?.timestamp || dataUpdatedAt)}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={handleRefresh}
          disabled={refreshMutation.isPending}
          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <RefreshCw
            className={`w-3 h-3 ${
              refreshMutation.isPending ? "animate-spin" : ""
            }`}
          />
          {refreshMutation.isPending ? "Refreshing..." : "Refresh Status"}
        </button>

        {health && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Auto-refresh: 30s
          </span>
        )}
      </div>
    </div>
  );
}
