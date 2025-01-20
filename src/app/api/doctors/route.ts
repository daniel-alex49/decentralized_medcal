// app/api/doctors/route.ts
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  try {
    // const user = await getCurrentUser()

    // if (!user) {
    //   return new Response("Unauthorized", { status: 401 })
    // }

    const doctorsData = await db.doctor.findMany({
      select: {
        id: true,
        userId: true,
        phoneNumber: true,
        aadharNumber: true,
        mbbsId: true,
        specialty: true,
        verified: true,
        blockId: true,
        user: {
          select: {
            name: true,
            createdAt: true, // Represents the join date
          },
        },
        // Assuming `totalPrescriptionsIssued` is calculated from a related table
        _count: {
          select: {
            Prescription: true, // Replace "prescriptions" with the actual relation name
          },
        },
      },
    })

    // Map the data to include `joinDate` and `totalPrescriptionsIssued`
    const doctors = doctorsData.map((doctor) => ({
      id: doctor.id,
      userId: doctor.userId,
      name: doctor.user.name,
      joinDate: doctor.user.createdAt,
      prescriptionsIssued: doctor._count.Prescription || 0,
      phoneNumber: doctor.phoneNumber,
      aadharNumber: doctor.aadharNumber,
      mbbsId: doctor.mbbsId,
      specialty: doctor.specialty,
      verified: doctor.verified,
      blockId: doctor.blockId,
    }))

    console.log(doctors)

    return new Response(JSON.stringify(doctors), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
