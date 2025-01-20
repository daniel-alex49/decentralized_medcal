import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Seed users with different roles
  const users = await prisma.user.createMany({
    data: [
      {
        id: "user_1",
        name: "Alice",
        email: "alice@example.com",
        role: "patient",
      },
      { id: "user_2", name: "Bob", email: "bob@example.com", role: "doctor" },
      {
        id: "user_3",
        name: "Charlie",
        email: "charlie@example.com",
        role: "admin",
      },
      {
        id: "user_4",
        name: "Dave",
        email: "dave@example.com",
        role: "patient",
      },
      { id: "user_5", name: "Eve", email: "eve@example.com", role: "doctor" },
    ],
  })

  // Seed Accounts
  const accounts = await prisma.account.createMany({
    data: [
      {
        userId: "user_1",
        type: "oauth",
        provider: "google",
        providerAccountId: "google_1",
      },
      {
        userId: "user_2",
        type: "oauth",
        provider: "google",
        providerAccountId: "google_2",
      },
      {
        userId: "user_3",
        type: "oauth",
        provider: "google",
        providerAccountId: "google_3",
      },
      {
        userId: "user_4",
        type: "oauth",
        provider: "google",
        providerAccountId: "google_4",
      },
      {
        userId: "user_5",
        type: "oauth",
        provider: "google",
        providerAccountId: "google_5",
      },
    ],
  })

  // Seed Doctors
  const doctors = await prisma.doctor.createMany({
    data: [
      {
        userId: "user_2",
        phoneNumber: "1234567890",
        aadharNumber: "Aadhar_1",
        mbbsId: "MBBS_1",
        specialty: "Cardiology",
        verified: true,
        blockId: "block_1",
      },
      {
        userId: "user_5",
        phoneNumber: "0987654321",
        aadharNumber: "Aadhar_2",
        mbbsId: "MBBS_2",
        specialty: "Neurology",
        verified: true,
        blockId: "block_2",
      },
    ],
  })

  // Seed Patients
  const patients = await prisma.patient.createMany({
    data: [
      {
        userId: "user_1",
        gender: "Female",
        dateOfBirth: new Date("1990-01-01"),
        bloodType: "A+",
        chronicDiseases: ["Diabetes"],
        emergencyContact: "1231231231",
        blockId: "patient_block_1",
      },
      {
        userId: "user_4",
        gender: "Male",
        dateOfBirth: new Date("1985-05-10"),
        bloodType: "B+",
        chronicDiseases: ["Hypertension"],
        emergencyContact: "4564564564",
        blockId: "patient_block_2",
      },
    ],
  })

  // Seed Sessions
  const sessions = await prisma.session.createMany({
    data: [
      {
        userId: "user_1",
        sessionToken: "session_1",
        expires: new Date(Date.now() + 86400000),
      },
      {
        userId: "user_2",
        sessionToken: "session_2",
        expires: new Date(Date.now() + 86400000),
      },
      {
        userId: "user_3",
        sessionToken: "session_3",
        expires: new Date(Date.now() + 86400000),
      },
      {
        userId: "user_4",
        sessionToken: "session_4",
        expires: new Date(Date.now() + 86400000),
      },
      {
        userId: "user_5",
        sessionToken: "session_5",
        expires: new Date(Date.now() + 86400000),
      },
    ],
  })

  // Seed Appointments
  const appointments = await prisma.appointment.createMany({
    data: [
      {
        doctorId: 4,
        patientId: 2,
        startTime: new Date("2024-11-01T10:00:00Z"),
        endTime: new Date("2024-11-01T11:00:00Z"),
        status: "CONFIRMED",
      },
      {
        doctorId: 5,
        patientId: 2,
        startTime: new Date("2024-11-02T10:00:00Z"),
        endTime: new Date("2024-11-02T11:00:00Z"),
        status: "PENDING",
      },
      {
        doctorId: 4,
        patientId: 2,
        startTime: new Date("2024-11-03T10:00:00Z"),
        endTime: new Date("2024-11-03T11:00:00Z"),
        status: "CONFIRMED",
      },
      {
        doctorId: 4,
        patientId: 3,
        startTime: new Date("2024-11-04T10:00:00Z"),
        endTime: new Date("2024-11-04T11:00:00Z"),
        status: "CANCELED",
      },
    ],
  })

  // Seed Verification Tokens
  const verificationTokens = await prisma.verificationToken.createMany({
    data: [
      {
        identifier: "alice@example.com",
        token: "token_1",
        expires: new Date(Date.now() + 86400000),
      },
      {
        identifier: "bob@example.com",
        token: "token_2",
        expires: new Date(Date.now() + 86400000),
      },
      {
        identifier: "charlie@example.com",
        token: "token_3",
        expires: new Date(Date.now() + 86400000),
      },
      {
        identifier: "dave@example.com",
        token: "token_4",
        expires: new Date(Date.now() + 86400000),
      },
      {
        identifier: "eve@example.com",
        token: "token_5",
        expires: new Date(Date.now() + 86400000),
      },
    ],
  })

  console.log("Seed data created")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
