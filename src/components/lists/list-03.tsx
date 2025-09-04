import { cn } from "@/lib/utils"
import { Calendar, type LucideIcon, ArrowRight, CheckCircle2, Clock, MapPin, Trophy, Users, Repeat } from "lucide-react"
import React from "react"

interface CourtSession {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: string
  date: string
  time: string
  duration: string
  status: "confirmed" | "upcoming" | "recurring"
  courtName: string
  sessionType: "singles" | "doubles" | "lesson"
}

interface List03Props {
  sessions?: CourtSession[]
  className?: string
}

const iconStyles = {
  singles: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  doubles: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  lesson: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
}

const statusConfig = {
  upcoming: {
    icon: Clock,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  confirmed: {
    icon: CheckCircle2,
    class: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  recurring: {
    icon: Repeat,
    class: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
}

const COURT_SESSIONS: CourtSession[] = [
  {
    id: "1",
    title: "Singles Match",
    subtitle: "Weekly practice session",
    icon: Trophy,
    iconStyle: "singles",
    date: "Jan 15, 2024",
    time: "6:00 PM",
    duration: "60 min",
    status: "confirmed",
    courtName: "Court 1 - Main",
    sessionType: "singles",
  },
  {
    id: "2",
    title: "Doubles Game",
    subtitle: "Team practice with partners",
    icon: Users,
    iconStyle: "doubles",
    date: "Jan 16, 2024",
    time: "7:00 PM",
    duration: "90 min",
    status: "upcoming",
    courtName: "Court 2 - Clay",
    sessionType: "doubles",
  },
  {
    id: "3",
    title: "Tennis Lesson",
    subtitle: "Backhand technique improvement",
    icon: Trophy,
    iconStyle: "lesson",
    date: "Jan 17, 2024",
    time: "5:00 PM",
    duration: "60 min",
    status: "recurring",
    courtName: "Court 3 - Hard",
    sessionType: "lesson",
  },
]

export default function List03({ sessions = COURT_SESSIONS, className }: List03Props) {
  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="flex gap-3 min-w-full p-1">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              "flex flex-col",
              "w-[280px] shrink-0",
              "bg-white dark:bg-zinc-900/70",
              "rounded-xl",
              "border border-zinc-100 dark:border-zinc-800",
              "hover:border-zinc-200 dark:hover:border-zinc-700",
              "transition-all duration-200",
              "shadow-sm backdrop-blur-xl",
            )}
          >
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-lg", iconStyles[session.iconStyle as keyof typeof iconStyles])}>
                  <session.icon className="w-4 h-4" />
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                    statusConfig[session.status].bg,
                    statusConfig[session.status].class,
                  )}
                >
                  {React.createElement(statusConfig[session.status].icon, { className: "w-3.5 h-3.5" })}
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{session.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{session.subtitle}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{session.courtName}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {session.time} • {session.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{session.date}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2",
                  "py-2.5 px-3",
                  "text-xs font-medium",
                  "text-zinc-600 dark:text-zinc-400",
                  "hover:text-zinc-900 dark:hover:text-zinc-100",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                  "transition-colors duration-200",
                )}
              >
                View Session
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
