import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react"

interface BookingActivity {
  id: string
  title: string
  courtName: string
  type: "success" | "failed" | "pending"
  desiredTime: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  errorReason?: string
}

interface List02Props {
  activities?: BookingActivity[]
  className?: string
}

const BOOKING_ACTIVITIES: BookingActivity[] = [
  {
    id: "1",
    title: "Court 1 Booking",
    courtName: "Main Court",
    type: "success",
    desiredTime: "Jan 8, 6:00 PM",
    timestamp: "Today, 6:00 AM",
    status: "completed",
  },
  {
    id: "2",
    title: "Court 2 Booking",
    courtName: "Clay Court",
    type: "failed",
    desiredTime: "Jan 8, 7:00 PM",
    timestamp: "Today, 7:00 AM",
    status: "failed",
    errorReason: "Court unavailable",
  },
  {
    id: "3",
    title: "Court 3 Booking",
    courtName: "Hard Court",
    type: "pending",
    desiredTime: "Jan 9, 8:00 PM",
    timestamp: "In progress",
    status: "pending",
  },
  {
    id: "4",
    title: "Court 1 Booking",
    courtName: "Main Court",
    type: "success",
    desiredTime: "Jan 7, 6:00 PM",
    timestamp: "Yesterday, 6:00 AM",
    status: "completed",
  },
  {
    id: "5",
    title: "Court 2 Booking",
    courtName: "Clay Court",
    type: "failed",
    desiredTime: "Jan 7, 7:00 PM",
    timestamp: "Yesterday, 7:00 AM",
    status: "failed",
    errorReason: "Login failed",
  },
]

export default function List02({ activities = BOOKING_ACTIVITIES, className }: List02Props) {
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Booking Activity
            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">(15 attempts)</span>
          </h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">Last 7 Days</span>
        </div>

        <div className="space-y-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "group flex items-center gap-3",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "border border-zinc-200 dark:border-zinc-700",
                )}
              >
                {activity.type === "success" && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                {activity.type === "failed" && <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                {activity.type === "pending" && <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>

              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{activity.title}</h3>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    {activity.courtName} • {activity.desiredTime}
                  </p>
                  {activity.errorReason && (
                    <p className="text-[11px] text-red-600 dark:text-red-400">{activity.errorReason}</p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pl-3">
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "bg-gradient-to-r from-zinc-900 to-zinc-800",
            "dark:from-zinc-50 dark:to-zinc-200",
            "text-zinc-50 dark:text-zinc-900",
            "hover:from-zinc-800 hover:to-zinc-700",
            "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
            "shadow-sm hover:shadow",
            "transform transition-all duration-200",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-500 dark:focus:ring-zinc-400",
            "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
          )}
        >
          <span>View All Booking History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
