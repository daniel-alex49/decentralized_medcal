import { Suspense, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

import { AppointmentCard, AppointmentSkeleton } from "./appointment-card"

// Section component
const AppointmentSection = ({ title, appointments, isPast = false }) => (
  <section className="space-y-4">
    <h2 className="flex items-center gap-2 text-xl font-semibold">
      {title}
      <Badge variant="outline" className="ml-2">
        {appointments.length}
      </Badge>
    </h2>
    <div className="space-y-4">
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            isPast={isPast}
          />
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No {isPast ? "past" : "upcoming"} appointments.
        </p>
      )}
    </div>
  </section>
)

export default async function Appointments() {
  const user = await getCurrentUser()
  if (!user || !user.id) return redirect("/login")

  const appointments =
    /* await db.appointment.findMany({
    where: {
      patient: {
        userId: user.id,
      },
    },
    select: {
      startTime: true,
      endTime: true,
      id: true,
      doctorId: true,
      status: true,
      doctor: {
        select: {
          mbbsId: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  }) */
    [
      {
        id: "1",
        status: "PENDING", // Replace with appropriate $Enums.AppointmentStatus value
        doctor: {
          user: {
            name: "Dr. Rohan Mehta",
          },
          mbbsId: "MBBS12345",
        },
        doctorId: "doc1",
        startTime: new Date("2025-01-18T10:00:00Z"),
        endTime: new Date("2025-01-18T10:30:00Z"),
      },
      {
        id: "2",
        status: "CONFIRMED", // Replace with appropriate $Enums.AppointmentStatus value
        doctor: {
          user: {
            name: "Dr. Priya Sharma",
          },
          mbbsId: "MBBS67890",
        },
        doctorId: "doc2",
        startTime: new Date("2025-01-17T15:00:00Z"),
        endTime: new Date("2025-01-17T15:30:00Z"),
      },
      {
        id: "3",
        status: "CANCELLED", // Replace with appropriate $Enums.AppointmentStatus value
        doctor: {
          user: {
            name: "Dr. Ankit Patel",
          },
          mbbsId: "MBBS11223",
        },
        doctorId: "doc3",
        startTime: new Date("2025-01-19T09:00:00Z"),
        endTime: new Date("2025-01-19T09:30:00Z"),
      },
      {
        id: "4",
        status: "PENDING", // Replace with appropriate $Enums.AppointmentStatus value
        doctor: {
          user: {
            name: null, // Doctor's name not provided
          },
          mbbsId: "MBBS44556",
        },
        doctorId: "doc4",
        startTime: new Date("2025-01-20T14:00:00Z"),
        endTime: new Date("2025-01-20T14:30:00Z"),
      },
      {
        id: "5",
        status: "InProgress", // Replace with appropriate $Enums.AppointmentStatus value
        doctor: {
          user: {
            name: "Dr. Kavita Rao",
          },
          mbbsId: "MBBS77889",
        },
        doctorId: "doc5",
        startTime: new Date("2025-01-18T12:00:00Z"),
        endTime: new Date("2025-01-18T12:30:00Z"),
      },
    ]

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.startTime) >= new Date()
  )
  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.startTime) < new Date()
  )

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Appointments"
        text="Create and manage your appointments."
      >
        <Link
          href="/dashboard/appointments/book"
          className={cn(buttonVariants())}
        >
          <Icons.add className="mr-2 size-4" />
          Book Appointment
        </Link>
      </DashboardHeader>
      <div className="container mx-auto space-y-8 p-4">
        <Suspense
          fallback={
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <AppointmentSkeleton key={i} />
              ))}
            </div>
          }
        >
          <AppointmentSection
            title="Upcoming Appointments"
            appointments={upcomingAppointments}
          />
          <AppointmentSection
            title="Past Appointments"
            appointments={pastAppointments}
            isPast
          />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
