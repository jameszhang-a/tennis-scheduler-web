import { cn } from "@/lib/utils"
import { Clock, MapPin, Calendar, AlertTriangle, CheckCircle, Timer, Plus } from "lucide-react"

interface BookingAttempt {
  id: string
  courtName: string
  desiredTime: string
  triggerTime: string
  status: "pending" | "ready" | "in-progress"
  timeUntilTrigger: string
  courtId: string
}

interface List01Props {
  totalAttempts?: string
  attempts?: BookingAttempt[]
  className?: string
}

const BOOKING_ATTEMPTS: BookingAttempt[] = [
  {
    id: "1",
    courtName: "Court 1 - Main",
    desiredTime: "Jan 15, 6:00 PM",
    triggerTime: "Jan 8, 6:00 PM",
    status: "ready",
    timeUntilTrigger: "2h 15m",
    courtId: "1",
  },
  {
    id: "2",
    courtName: "Court 2 - Clay",
    desiredTime: "Jan 16, 7:00 PM",
    triggerTime: "Jan 9, 7:00 PM",
    status: "pending",
    timeUntilTrigger: "1d 2h",
    courtId: "2",
  },
  {
    id: "3",
    courtName: "Court 1 - Main",
    desiredTime: "Jan 17, 6:00 PM",
    triggerTime: "Jan 10, 6:00 PM",
    status: "pending",
    timeUntilTrigger: "2d 2h",
    courtId: "1",
  },
  {
    id: "4",
    courtName: "Court 3 - Hard",
    desiredTime: "Jan 18, 8:00 PM",
    triggerTime: "Jan 11, 8:00 PM",
    status: "in-progress",
    timeUntilTrigger: "Booking now...",
    courtId: "3",
  },
]

export default function List01({ totalAttempts = "7 Active", attempts = BOOKING_ATTEMPTS, className }: List01Props) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Active Booking Attempts</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{totalAttempts}</h1>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Next 7 Days</h2>
        </div>

        <div className="space-y-1">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-green-100 dark:bg-green-900/30": attempt.status === "ready",
                    "bg-blue-100 dark:bg-blue-900/30": attempt.status === "pending",
                    "bg-orange-100 dark:bg-orange-900/30": attempt.status === "in-progress",
                  })}
                >
                  {attempt.status === "ready" && (
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  )}
                  {attempt.status === "pending" && <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {attempt.status === "in-progress" && (
                    <Timer className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{attempt.courtName}</h3>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{attempt.desiredTime}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{attempt.timeUntilTrigger}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Courts</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Issues</span>
          </button>
        </div>
      </div>
    </div>
  )
}
