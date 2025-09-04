/**
 * Tennis Scheduler API calls
 * Specific API endpoints for the tennis scheduler backend
 */

import { apiRequest, ApiError } from "./api-utils";
import { API_ENDPOINTS } from "@/lib/types";
import type {
  HealthCheckResponse,
  Schedule,
  SchedulesFilters,
  StatsResponse,
  SchedulerStatusResponse,
  TokenStatusResponse,
  CancelScheduleResponse,
} from "@/lib/types";

/**
 * Health check API call
 */
export async function getHealthCheck(): Promise<HealthCheckResponse> {
  try {
    const response = await apiRequest<HealthCheckResponse>(
      API_ENDPOINTS.HEALTH
    );
    return {
      ...response,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch health status");
  }
}

/**
 * Get all schedules with optional filtering
 */
export async function getSchedules(
  filters?: SchedulesFilters
): Promise<Schedule[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append("status", filters.status);
  if (filters?.court_id) params.append("court_id", filters.court_id);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  return apiRequest<Schedule[]>(
    `${API_ENDPOINTS.SCHEDULES}${queryString ? `?${queryString}` : ""}`
  );
}

/**
 * Get schedule by ID
 */
export async function getSchedule(id: string | number): Promise<Schedule> {
  return apiRequest<Schedule>(`${API_ENDPOINTS.SCHEDULES}/${id}`);
}

/**
 * Get upcoming schedules for the next N days
 */
export async function getUpcomingSchedules(
  days: number = 7
): Promise<Schedule[]> {
  return apiRequest<Schedule[]>(
    `${API_ENDPOINTS.SCHEDULES_UPCOMING}?days=${days}`
  );
}

/**
 * Cancel a schedule
 */
export async function cancelSchedule(
  id: string | number
): Promise<CancelScheduleResponse> {
  return apiRequest<CancelScheduleResponse>(
    `${API_ENDPOINTS.SCHEDULES}/${id}`,
    { method: "DELETE" }
  );
}

/**
 * Get statistics
 */
export async function getStats(): Promise<StatsResponse> {
  return apiRequest<StatsResponse>(API_ENDPOINTS.STATS);
}

/**
 * Get scheduler status
 */
export async function getSchedulerStatus(): Promise<SchedulerStatusResponse> {
  return apiRequest<SchedulerStatusResponse>(API_ENDPOINTS.SCHEDULER_STATUS);
}

/**
 * Get token status
 */
export async function getTokenStatus(): Promise<TokenStatusResponse> {
  return apiRequest<TokenStatusResponse>(API_ENDPOINTS.TOKEN_STATUS);
}

// Re-export ApiError for convenience
export { ApiError };
