"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Loading skeleton component
export const AppointmentSkeleton = () => (
  <Card className="flex animate-pulse items-center justify-between shadow-sm">
    <CardHeader className="w-2/3">
      <Skeleton className="mb-2 h-6 w-48" />
      <Skeleton className="h-4 w-64" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-6 w-20" />
    </CardContent>
  </Card>
)

// Appointment card component
export const AppointmentCard = ({ appointment, isPast = false }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      key={appointment.id}
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-md",
        isPast && "opacity-75 hover:opacity-100"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 text-lg">
            {appointment.doctor.user.name}
            <span className="text-sm text-muted-foreground">
              ({appointment.doctor.mbbsId})
            </span>
          </CardTitle>
          <CardDescription className="mt-2 flex items-center">
            <CalendarIcon className="mr-2 size-4" />
            <span>
              {new Date(appointment.startTime).toLocaleDateString()} at{" "}
              {new Date(appointment.startTime).toLocaleTimeString()} -{" "}
              {new Date(appointment.endTime).toLocaleTimeString()}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4 p-0">
          <Badge
            className={cn(
              "transition-colors",
              appointment.status === "PENDING" &&
                "bg-yellow-600 hover:bg-yellow-700",
              appointment.status === "CONFIRMED" &&
                "bg-green-600 hover:bg-green-700",
              appointment.status === "CANCELED" && "bg-red-600 hover:bg-red-700"
            )}
            variant="outline"
          >
            {appointment.status}
          </Badge>
          <ChevronDown
            className={cn(
              "size-5 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </CardContent>
      </div>

      <div
        className={cn(
          "grid transition-all duration-200",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t p-6 pt-0">
            <p className="text-sm text-muted-foreground">
              Additional appointment details would go here...
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
