/**
 * Tennis Scheduler API calls
 * Specific API endpoints for the tennis scheduler backend
 */

import { apiRequest, ApiError } from "./api-utils";

/**
 * Health check API call
 */
export async function getHealthCheck(): Promise<{
  status: string;
  service?: string;
  timestamp: string;
}> {
  try {
    const response = await apiRequest<{ status: string; service?: string }>(
      "/api/health"
    );
    return {
      status: response.status || "healthy",
      service: response.service,
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
export async function getSchedules(filters?: {
  status?: "pending" | "success" | "failed" | "cancelled";
  court_id?: "1" | "2";
  limit?: number;
  offset?: number;
}): Promise<any[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append("status", filters.status);
  if (filters?.court_id) params.append("court_id", filters.court_id);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.offset) params.append("offset", filters.offset.toString());

  const queryString = params.toString();
  return apiRequest(`/api/schedules${queryString ? `?${queryString}` : ""}`);
}

/**
 * Get schedule by ID
 */
export async function getSchedule(id: string | number): Promise<any> {
  return apiRequest(`/api/schedules/${id}`);
}

/**
 * Get upcoming schedules for the next N days
 */
export async function getUpcomingSchedules(days: number = 7): Promise<any[]> {
  return apiRequest(`/api/schedules/upcoming?days=${days}`);
}

/**
 * Cancel a schedule
 */
export async function cancelSchedule(id: string | number): Promise<any> {
  return apiRequest(`/api/schedules/${id}`, { method: "DELETE" });
}

/**
 * Get statistics
 */
export async function getStats(): Promise<{
  total_schedules: number;
  pending_schedules: number;
  successful_schedules: number;
  failed_schedules: number;
  next_booking?: string;
}> {
  return apiRequest("/api/stats");
}

/**
 * Get scheduler status
 */
export async function getSchedulerStatus(): Promise<{
  is_running: boolean;
  total_jobs: number;
  jobs: Array<{
    job_id: string;
    next_run_time: string;
    name: string;
  }>;
}> {
  return apiRequest("/api/scheduler/status");
}

/**
 * Get token status
 */
export async function getTokenStatus(): Promise<{
  has_refresh_token: boolean;
  access_token_valid: boolean;
  access_expiry: string;
  refresh_expiry: string;
}> {
  return apiRequest("/api/token/status");
}

// Re-export ApiError for convenience
export { ApiError };
