import { redirect } from "next/navigation"
import { PatientDashboardData } from "@/types"
import { Heart, Shield, Zap } from "lucide-react"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import PatientProfile from "./profile"

export default async function PatientPage() {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  const patientData = await getPatientDataById(user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Patient Profile"
        text="See all things related to you"
      />
      <PatientProfile patientData={patientData} />
    </DashboardShell>
  )
}

async function getPatientDataById(
  patientId: string
): Promise<PatientDashboardData> {
  const patientWithUser = await db.patient.findFirst({
    where: {
      userId: patientId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })

  if (!patientWithUser) {
    // throw new Error("Patient not found")
  }
  if (!patientWithUser)
    return {
      id: "abc",
      userId: "user123",
      name: "Om Thorat",
      email: "thoratom1104@gmail.com",
      image: "/logo.svg",
      gender: "Male",
      dateOfBirth: new Date("2004-10-26"),
      bloodType: "O+",
      chronicDiseases: ["Hypertension", "Diabetes"],
      emergencyContact: "+1 (555) 123-4567",
      blockId: "0x12345678901234567890",
    }

  return {
    id: patientWithUser.id,
    userId: patientWithUser.userId,
    name: patientWithUser.user.name,
    email: patientWithUser.user.email,
    image: patientWithUser.user.image,
    gender: patientWithUser.gender,
    dateOfBirth: patientWithUser.dateOfBirth,
    bloodType: patientWithUser.bloodType,
    chronicDiseases: patientWithUser.chronicDiseases,
    emergencyContact: patientWithUser.emergencyContact,
    blockId: patientWithUser.blockId,
  }
}
