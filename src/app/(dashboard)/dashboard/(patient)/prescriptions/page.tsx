import { redirect } from "next/navigation"
import { Medication, Prescription } from "@prisma/client"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { sleep } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { PrescriptionCard } from "./_components/prescription-card"

interface ColorScheme {
  primary: string
  secondary: string
  text: string
}

const colorSchemes: ColorScheme[] = [
  { primary: "bg-blue-500", secondary: "bg-blue-700", text: "text-blue-100" },
  {
    primary: "bg-purple-500",
    secondary: "bg-purple-700",
    text: "text-purple-100",
  },
  {
    primary: "bg-green-500",
    secondary: "bg-green-700",
    text: "text-green-100",
  },
  { primary: "bg-pink-500", secondary: "bg-pink-700", text: "text-pink-100" },
]

export default async function PrescriptionsPage() {
  const user = await getCurrentUser()
  if (!user || !user.id) return redirect("/login")

  const role = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })
  if (role?.role != "patient") return redirect("/dashboard")

  const data = await db.patient.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      prescriptions: {
        select: {
          id: true,
          issueDate: true,
          validTill: true,
          medications: true,
          doctor: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  const prescriptions =
    data?.prescriptions ||
    ([] as Omit<
      Prescription & { medications: Medication[] } & {
        doctor: { id: string; user: { name: string | null } }
      },
      "doctorId" | "patientId"
    >[])

  await prescriptions.push({
    id: "1",
    issueDate: new Date(),
    validTill: new Date(),
    medications: [
      {
        id: "7bef6d5e-f03e-4f52-8d0b-90ca76353f7d",
        prescId: "123e4567-e89b-12d3-a456-426614174000",
        name: "Lisinopril",
        dosage: "10mg",
        duration: "30 days",
        additionalInstructions:
          "Take 1 tablet by mouth once daily in the morning with or without food",
      },
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        prescId: "123e4567-e89b-12d3-a456-426614174000",
        name: "Hydrochlorothiazide",
        dosage: "12.5mg",
        duration: "30 days",
        additionalInstructions:
          "Take 1 tablet by mouth once daily in the morning with food",
      },
    ],
    doctor: {
      id: "1",
      user: {
        name: "John Doe",
      },
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Prescriptions"
        text="See all prescriptions issued to you"
      />
      <div className="space-y-8">
        {prescriptions.map((prescription, index) => (
          <PrescriptionCard
            key={prescription.id}
            prescription={prescription}
            colorScheme={colorSchemes[index % colorSchemes.length]}
          />
        ))}
      </div>
    </DashboardShell>
  )
}
