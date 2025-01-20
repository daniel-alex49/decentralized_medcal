import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const patientCreateSchema = z.object({
  userId: z.string().min(1),
  gender: z.string().min(1, { message: "Gender is required." }),
  dateOfBirth: z.string(),
  bloodType: z.string().min(1, { message: "Blood type is required." }),
  chronicDiseases: z
    .string()
    .array()
    .max(10, "No more than 10 illnesses can be added!"),
  emergencyContact: z
    .string()
    .min(10, { message: "Emergency contact must be at least 10 digits." }),
  blockId: z.string().startsWith("0x", { message: "Invalid account address." }),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const doctors = await db.patient.findMany({
      select: {
        id: true,
        userId: true,
        blockId: true,
        bloodType: true,
        dateOfBirth: true,
        gender: true,
        emergencyContact: true,
      },
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(doctors))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    // const { user } = session

    const json = await req.json()
    const body = patientCreateSchema.parse(json)
    console.log(body)

    const patient = await db.patient.create({
      data: {
        userId: body.userId,
        gender: body.gender,
        dateOfBirth: new Date(body.dateOfBirth),
        bloodType: body.bloodType,
        chronicDiseases: body.chronicDiseases ?? [],
        emergencyContact: body.emergencyContact,
        blockId: body.blockId,
      },
      select: {
        id: true,
      },
    })

    await db.user.update({
      where: {
        id: body.userId,
      },
      data: {
        role: "patient",
      },
    })

    return new Response(JSON.stringify(patient))
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
