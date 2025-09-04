import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHealthCheck,
  getSchedules,
  getSchedule,
  getUpcomingSchedules,
  cancelSchedule,
  getStats,
  getSchedulerStatus,
  getTokenStatus,
  ApiError,
} from "@/lib/api";
import { apiPost, apiPut } from "@/lib/api-utils";

/**
 * Query Keys - Centralized key management for TanStack Query
 * Following best practices for query key factories
 */
export const queryKeys = {
  all: ["tennis-scheduler"] as const,
  health: () => [...queryKeys.all, "health"] as const,
  schedules: () => [...queryKeys.all, "schedules"] as const,
  schedulesList: (filters?: Record<string, any>) =>
    [...queryKeys.schedules(), "list", filters] as const,
  schedulesUpcoming: (days?: number) =>
    [...queryKeys.schedules(), "upcoming", days] as const,
  schedulesDetail: (id: string | number) =>
    [...queryKeys.schedules(), "detail", id] as const,
  stats: () => [...queryKeys.all, "stats"] as const,
  scheduler: () => [...queryKeys.all, "scheduler"] as const,
  schedulerStatus: () => [...queryKeys.scheduler(), "status"] as const,
  token: () => [...queryKeys.all, "token"] as const,
  tokenStatus: () => [...queryKeys.token(), "status"] as const,
} as const;

/**
 * Health Check Query Hook
 * Polls the backend health status with automatic refetching
 */
export function useHealthCheck(options?: {
  enabled?: boolean;
  refetchInterval?: number;
}) {
  return useQuery({
    queryKey: queryKeys.health(),
    queryFn: getHealthCheck,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: options?.refetchInterval ?? 30 * 1000, // Poll every 30 seconds
    refetchIntervalInBackground: false,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      // Don't retry too aggressively for health checks
      if (error instanceof ApiError && error.status === 0) {
        // Network error - retry up to 2 times
        return failureCount < 2;
      }
      return failureCount < 1;
    },
  });
}

/**
 * Manual Health Check Mutation
 * For manual refresh button
 */
export function useRefreshHealthCheck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getHealthCheck,
    onSuccess: (data) => {
      // Update the health check cache with fresh data
      queryClient.setQueryData(queryKeys.health(), data);
    },
    onError: (error) => {
      console.error("Manual health check failed:", error);
    },
  });
}

/**
 * Schedules List Query Hook
 */
export function useSchedules(filters?: {
  status?: "pending" | "success" | "failed" | "cancelled";
  court_id?: "1" | "2";
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: queryKeys.schedulesList(filters),
    queryFn: () => getSchedules(filters),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Upcoming Schedules Query Hook
 */
export function useUpcomingSchedules(days: number = 7) {
  return useQuery({
    queryKey: queryKeys.schedulesUpcoming(days),
    queryFn: () => getUpcomingSchedules(days),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Schedule Detail Query Hook
 */
export function useSchedule(id: string | number) {
  return useQuery({
    queryKey: queryKeys.schedulesDetail(id),
    queryFn: () => getSchedule(id),
    enabled: !!id,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Statistics Query Hook
 */
export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats(),
    queryFn: getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Scheduler Status Query Hook
 */
export function useSchedulerStatus() {
  return useQuery({
    queryKey: queryKeys.schedulerStatus(),
    queryFn: getSchedulerStatus,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Poll every 2 minutes
  });
}

/**
 * Token Status Query Hook
 */
export function useTokenStatus() {
  return useQuery({
    queryKey: queryKeys.tokenStatus(),
    queryFn: getTokenStatus,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Cancel Schedule Mutation Hook
 */
export function useCancelSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => cancelSchedule(id),
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedules(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.stats(),
      });

      // Remove the cancelled schedule from cache
      queryClient.removeQueries({
        queryKey: queryKeys.schedulesDetail(variables),
      });
    },
  });
}

/**
 * Generic mutation hook for POST requests
 */
export function useCreateMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
  }
) {
  return useMutation({
    mutationFn: (data: TVariables) => apiPost<TData>(endpoint, data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Generic mutation hook for PUT requests
 */
export function useUpdateMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
  }
) {
  return useMutation({
    mutationFn: (data: TVariables) => apiPut<TData>(endpoint, data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
