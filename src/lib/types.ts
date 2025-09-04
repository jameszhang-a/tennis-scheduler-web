/**
 * Simple type definitions for Tennis Scheduler API
 */

export type ScheduleStatus = "pending" | "success" | "failed" | "cancelled";
export type CourtId = "1" | "2";
export type ScheduleType = "one-off" | "recurring";

export type HealthCheckResponse = {
  status: "healthy" | "unhealthy" | "degraded";
  service: string;
  scheduler_status?: "running" | "stopped" | "error";
  scheduled_jobs?: number;
  timestamp: string;
};

export type Schedule = {
  id: number;
  type: ScheduleType;
  desired_time: string;
  trigger_time: string;
  court_id: CourtId;
  status: ScheduleStatus;
  duration: number;
  rrule?: string;
  created_at?: string;
  updated_at?: string;
};

export type SchedulesFilters = {
  status?: ScheduleStatus;
  court_id?: CourtId;
  limit?: number;
  offset?: number;
};

export type StatsResponse = {
  total_schedules: number;
  pending_schedules: number;
  successful_schedules: number;
  failed_schedules: number;
  next_booking?: string;
};

export type SchedulerStatusResponse = {
  is_running: boolean;
  total_jobs: number;
  jobs: Array<{
    job_id: string;
    next_run_time: string;
    name: string;
  }>;
};

export type TokenStatusResponse = {
  has_refresh_token: boolean;
  access_token_valid: boolean;
  access_expiry: string;
  refresh_expiry: string;
};

export type CancelScheduleResponse = {
  message: string;
  schedule_id: number;
};

/**
 * API Endpoint Types for better type safety
 */
export const API_ENDPOINTS = {
  HEALTH: "/api/health",
  SCHEDULES: "/api/schedules",
  SCHEDULES_UPCOMING: "/api/schedules/upcoming",
  STATS: "/api/stats",
  SCHEDULER_STATUS: "/api/scheduler/status",
  TOKEN_STATUS: "/api/token/status",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
