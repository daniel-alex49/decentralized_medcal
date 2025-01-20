"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { motion } from "framer-motion"
import {
  Clock,
  DollarSign,
  Droplet,
  FileText,
  Heart,
  Mail,
  Phone,
  Plus,
  Shield,
  User,
  Zap,
} from "lucide-react"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalContract } from "@/components/contract"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

// Mock doctor data (replace with actual data fetching logic)
const doctorData = {
  id: 1,
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
  balance: 500,
}

// Mock connected doctors data
const connectedDoctors = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Dr. Mike Johnson",
    specialty: "Endocrinologist",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Dr. Sarah Lee",
    specialty: "General Practitioner",
    image: "/placeholder.svg?height=50&width=50",
  },
]

// doctor benefits data
const doctorBenefits = [
  {
    icon: <Heart className="size-6 text-red-500" />,
    title: "24/7 Care",
    description: "Round-the-clock access to medical professionals",
  },
  {
    icon: <Shield className="size-6 text-blue-500" />,
    title: "Secure Records",
    description:
      "Your medical data is protected with state-of-the-art encryption",
  },
  {
    icon: <Zap className="size-6 text-yellow-500" />,
    title: "Fast Appointments",
    description: "Book appointments quickly and easily",
  },
]

export default function DoctorProfile() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [prescriptions, setPrescriptions] = useState<any[]>([])
  const [balance, setBalance] = useState(100)
  const [topUpAmount, setTopUpAmount] = useState("")

  useEffect(() => {
    // Fetch appointments and prescriptions
    // This is a mock implementation. Replace with actual API calls.
    setAppointments([
      {
        id: 1,
        startTime: new Date("2023-06-10T10:00:00"),
        status: "CONFIRMED",
      },
      { id: 2, startTime: new Date("2023-06-15T14:30:00"), status: "PENDING" },
    ])
    setPrescriptions([
      {
        id: "presc1",
        issueDate: new Date("2023-06-01"),
        validTill: new Date("2023-07-01"),
      },
      {
        id: "presc2",
        issueDate: new Date("2023-05-15"),
        validTill: new Date("2023-06-15"),
      },
    ])
  }, [])

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount)
    if (!isNaN(amount) && amount > 0) {
      setBalance((prevBalance) => prevBalance + amount)
      setTopUpAmount("")
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="doctor Profile"
        text="See all things related to you"
      />

      <div className={`min-h-screen`}>
        <div className="container mx-auto space-y-6 bg-background p-6 text-foreground transition-colors duration-300">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="relative flex justify-between">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Icons.logo className="size-2/3 opacity-20 duration-300 hover:animate-pulse" />
                </div>
                <div>
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar className="size-20">
                        <AvatarImage
                          src={doctorData?.image}
                          alt={doctorData?.name}
                        />
                        <AvatarFallback>
                          {doctorData?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">
                        {doctorData?.name}
                      </CardTitle>
                      <CardDescription>
                        doctor ID: {doctorData?.id}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <InfoItem
                      icon={
                        <User className="text-blue-500 dark:text-blue-400" />
                      }
                      label="Gender"
                      value={doctorData?.gender}
                    />
                    <InfoItem
                      icon={
                        <Mail className="text-green-500 dark:text-green-400" />
                      }
                      label="Email"
                      value={doctorData?.email}
                    />
                    <InfoItem
                      icon={
                        <Droplet className="text-red-500 dark:text-red-400" />
                      }
                      label="Blood Type"
                      value={doctorData?.bloodType}
                    />
                    <InfoItem
                      icon={
                        <Phone className="text-yellow-500 dark:text-yellow-400" />
                      }
                      label="Emergency Contact"
                      value={doctorData?.emergencyContact}
                    />
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Chronic Diseases
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctorData?.chronicDiseases.map((disease, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                            >
                              {disease}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
                <Image
                  src="/illustrations/doctor-1.svg"
                  alt="Health Journey Visualization"
                  width={400}
                  height={300}
                  className="hidden rounded-lg shadow-lg lg:block"
                />
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">doctor Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {doctorBenefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex flex-col items-center rounded-lg bg-secondary p-4 text-center"
                    >
                      {benefit.icon}
                      <h3 className="mt-2 font-semibold">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Connected Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connectedDoctors.map((doctor, index) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <Avatar>
                          <AvatarImage src={doctor.image} alt={doctor.name} />
                          <AvatarFallback>
                            {doctor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Account Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center text-3xl font-bold">
                        <code className="mr-2 mt-2 text-sm text-secondary-foreground">
                          HTK
                        </code>
                        {balance.toFixed(2)}
                      </div>
                      <span className="flex items-center text-sm text-primary/70">
                        ≈
                        <DollarSign className="size-4" />
                        {balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="w-24"
                      />
                      <Button
                        onClick={handleTopUp}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        <Plus className="mr-2 size-4" /> Top Up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="appointments" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="prescriptions">
                      Prescriptions
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="appointments">
                    <div className="space-y-4">
                      {appointments.map((appointment, index) => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center space-x-2">
                            <Clock className="text-blue-500 dark:text-blue-400" />
                            <span>
                              {appointment.startTime.toLocaleString()}
                            </span>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "CONFIRMED"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </motion.div>
                      ))}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="mt-4 w-full bg-green-500 text-white hover:bg-green-600">
                          Schedule New Appointment
                        </Button>
                      </motion.div>
                    </div>
                  </TabsContent>
                  <TabsContent value="prescriptions">
                    <div className="space-y-4">
                      {prescriptions.map((prescription, index) => (
                        <motion.div
                          key={prescription.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center space-x-2">
                            <FileText className="text-pink-500 dark:text-pink-400" />
                            <span>
                              Issued:{" "}
                              {prescription.issueDate.toLocaleDateString()}
                            </span>
                          </div>
                          <span>
                            Valid till:{" "}
                            {prescription.validTill.toLocaleDateString()}
                          </span>
                        </motion.div>
                      ))}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="mt-4 w-full border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900"
                        >
                          View All Prescriptions
                        </Button>
                      </motion.div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </motion.div>
  )
}
