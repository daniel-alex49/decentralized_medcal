// app/api/appointments/route.ts
import { z } from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

// Enum to match Prisma schema
const AppointmentStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
} as const

// Validation schema for appointment request
const appointmentSchema = z.object({
  doctorId: z.string(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
})

// Error responses
const ERROR_RESPONSES = {
  UNAUTHORIZED: { message: "Unauthorized access", status: 401 },
  PATIENT_NOT_FOUND: { message: "Patient profile not found", status: 404 },
  DOCTOR_NOT_FOUND: { message: "Doctor not found", status: 404 },
  CONFLICT: { message: "Time slot not available", status: 409 },
  INVALID_TIME: { message: "Invalid appointment time", status: 400 },
  ACCESS_DENIED: { message: "Access request not approved", status: 403 },
  SERVER_ERROR: { message: "Internal server error", status: 500 },
}

export async function POST(req: Request) {
  try {
    // Validate user session
    const user = await getCurrentUser()
    if (!user) {
      return new Response(null, { status: 401 })
    }

    // Parse request body
    const json = await req.json()
    const { doctorId, startTime, endTime } = appointmentSchema.parse(json)

    // Convert strings to Date objects
    const startDateTime = new Date(startTime)
    const endDateTime = new Date(endTime)

    // Get patient profile
    const patient = await db.patient.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        blockId: true,
      },
    })

    if (!patient) {
      return new Response("Patient not found", { status: 404 })
    }

    // Get doctor profile
    const doctor = await db.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        blockId: true,
        verified: true,
      },
    })

    if (!doctor) {
      return new Response("Doctor not found", { status: 404 })
    }

    if (!doctor.verified) {
      return new Response("Doctor not verified", {
        status: 403,
      })
    }

    // Check if doctor has access to patient's records
    const accessRequest = await db.req_access.findUnique({
      where: {
        doctorId_patientId: {
          doctorId: doctor.blockId,
          patientId: patient.blockId,
        },
      },
    })

    if (!accessRequest || accessRequest.status !== "CONFIRMED") {
      return new Response("Access request not approved", { status: 403 })
    }

    // Check for conflicting appointments
    const conflictingAppointment = await db.appointment.findFirst({
      where: {
        OR: [
          {
            doctorId,
            startTime: {
              lte: endDateTime,
            },
            endTime: {
              gte: startDateTime,
            },
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
          },
          {
            patientId: patient.id,
            startTime: {
              lte: endDateTime,
            },
            endTime: {
              gte: startDateTime,
            },
            status: {
              in: ["PENDING", "CONFIRMED"],
            },
          },
        ],
      },
    })

    if (conflictingAppointment) {
      return new Response("Time slot not available", { status: 409 })
    }

    // Create appointment
    const appointment = await db.appointment.create({
      data: {
        doctorId,
        patientId: patient.id,
        startTime: startDateTime,
        endTime: endDateTime,
        status: "PENDING",
      },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        patient: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return Response.json({
      status: "success",
      data: appointment,
      message: "Appointment request created successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error("Appointment creation error:", error)
    return Response.json(
      {
        status: "error",
        message: ERROR_RESPONSES.SERVER_ERROR.message,
      },
      { status: ERROR_RESPONSES.SERVER_ERROR.status }
    )
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") as keyof typeof AppointmentStatus
    const limit = parseInt(searchParams.get("limit") ?? "10")
    const offset = parseInt(searchParams.get("offset") ?? "0")

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    })

    // Get appropriate ID based on user role
    const userProfile =
      userData?.role === "doctor"
        ? await db.doctor.findFirst({ where: { userId: user.id } })
        : await db.patient.findFirst({ where: { userId: user.id } })

    if (!userProfile) {
      return new Response("Profile not found", { status: 404 })
    }

    // Build query based on user role
    const where = {
      ...(userData?.role === "doctor"
        ? { doctorId: userProfile.id }
        : { patientId: userProfile.id }),
      ...(status && { status: status }),
    }

    const appointments = await db.appointment.findMany({
      where,
      include: {
        doctor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        patient: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { startTime: "desc" },
      take: limit,
      skip: offset,
    })

    const total = await db.appointment.count({ where })

    return Response.json({
      status: "success",
      data: appointments,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: ERROR_RESPONSES.SERVER_ERROR.message,
      },
      { status: ERROR_RESPONSES.SERVER_ERROR.status }
    )
  }
}
