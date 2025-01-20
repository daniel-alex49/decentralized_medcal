'use client'

import { useState } from "react"
import { Calendar, Check, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const appointment = {
  title: "Someone has some problem",
  date: "June 15, 2023",
  time: "2:00 PM",
  description: "Regular dental check-up and cleaning.",
}

type CardProps = React.ComponentProps<typeof Card>

export default function AppointmentCard({ className, ...props }: CardProps) {
  const [isAccepted, setIsAccepted] = useState(false)

  const handleButtonClick = () => {
    if (!isAccepted) {
      setIsAccepted(true)
    } else {
      // Here you would typically navigate to a details page
      // For this example, we'll just log to the console
      console.log("Navigating to appointment details...")
    }
  }

  return (
    <Card className={cn("w-[380px] m-auto mt-32", className)} {...props}>
      <CardHeader>
        <CardTitle>Appointment Request</CardTitle>
        <CardDescription>You have a new appointment request.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Calendar />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {appointment.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.date}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Clock />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Appointment Time
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.time}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {appointment.description}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleButtonClick}>
          {isAccepted ? (
            <>See Details</>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Accept Appointment
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
