import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const doctorCreateSchema = z.object({
  userId: z.string().min(1),
  phoneNumber: z.string().min(10).max(15, "Phone number is invalid"),
  aadharNumber: z.string().min(12, "Aadhar number must be 12 digits"),
  mbbsId: z.string().min(1, "MBBS ID is required"),
  specialty: z.string().min(3, "Specialty must be specified"),
  blockId: z.string().startsWith("0x").min(1),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const doctors = await db.doctor.findMany({
      select: {
        id: true,
        phoneNumber: true,
        aadharNumber: true,
        mbbsId: true,
        specialty: true,
        verified: true,
        userId: true,
        blockId: true,
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
    const body = doctorCreateSchema.parse(json)
    console.log(body)

    const doctor = await db.doctor.create({
      data: {
        userId: body.userId,
        phoneNumber: body.phoneNumber,
        aadharNumber: body.aadharNumber,
        mbbsId: body.mbbsId,
        specialty: body.specialty,
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

    return new Response(JSON.stringify(doctor))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
