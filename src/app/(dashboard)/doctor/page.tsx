"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Award,
  Briefcase,
  Clock,
  DollarSign,
  Heart,
  Mail,
  Moon,
  Phone,
  Plus,
  Shield,
  Star,
  Sun,
  User,
  Zap,
} from "lucide-react"

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
import { Icons } from "@/components/icons"

// Mock doctor data (replace with actual data fetching logic)
const doctorData = {
  id: 1,
  userId: "doc123",
  name: "Dr. Jane Smith",
  email: "jane.smith@example.com",
  image: "/placeholder.svg?height=100&width=100",
  gender: "Female",
  phoneNumber: "+1 (555) 987-6543",
  specialty: "Cardiologist",
  qualifications: ["MBBS", "MD", "FACC"],
  experience: 15,
  rating: 4.8,
  blockId: "block456",
  balance: 10000,
}

// Mock patient data
const patients = [
  {
    id: 1,
    name: "John Doe",
    lastVisit: new Date("2023-05-20"),
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Alice Johnson",
    lastVisit: new Date("2023-05-18"),
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Bob Williams",
    lastVisit: new Date("2023-05-15"),
    image: "/placeholder.svg?height=50&width=50",
  },
]

// Doctor benefits data
const doctorBenefits = [
  {
    icon: <Heart className="size-6 text-red-500" />,
    title: "Patient Care",
    description: "Access to comprehensive patient histories",
  },
  {
    icon: <Shield className="size-6 text-blue-500" />,
    title: "Secure Platform",
    description: "HIPAA-compliant data management",
  },
  {
    icon: <Zap className="size-6 text-yellow-500" />,
    title: "Efficient Scheduling",
    description: "Smart appointment management system",
  },
]

export default function DoctorProfile() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [balance, setBalance] = useState(doctorData.balance)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  useEffect(() => {
    // Fetch appointments
    // This is a mock implementation. Replace with actual API calls.
    setAppointments([
      {
        id: 1,
        patientName: "John Doe",
        startTime: new Date("2023-06-10T10:00:00"),
        status: "CONFIRMED",
      },
      {
        id: 2,
        patientName: "Alice Johnson",
        startTime: new Date("2023-06-10T14:30:00"),
        status: "PENDING",
      },
      {
        id: 3,
        patientName: "Bob Williams",
        startTime: new Date("2023-06-11T11:00:00"),
        status: "CONFIRMED",
      },
    ])
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance((prevBalance) => prevBalance - amount)
      setWithdrawAmount("")
    }
  }

  

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto space-y-6 bg-background p-6 text-foreground transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <Moon className="size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>

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
                    <AvatarImage src={doctorData.image} alt={doctorData.name} />
                    <AvatarFallback>{doctorData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <CardTitle className="text-2xl">{doctorData.name}</CardTitle>
                  <CardDescription>{doctorData.specialty}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <InfoItem
                  icon={<Mail className="text-green-500 dark:text-green-400" />}
                  label="Email"
                  value={doctorData.email}
                />
                <InfoItem
                  icon={<Phone className="text-blue-500 dark:text-blue-400" />}
                  label="Phone"
                  value={doctorData.phoneNumber}
                />
                <InfoItem
                  icon={
                    <Briefcase className="text-purple-500 dark:text-purple-400" />
                  }
                  label="Experience"
                  value={`${doctorData.experience} years`}
                />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Qualifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.qualifications.map((qual, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {qual}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-500" />
                  <span className="font-semibold">{doctorData.rating}</span>
                  <span className="text-muted-foreground">
                    ({Math.floor(Math.random() * 500) + 100} reviews)
                  </span>
                </div>
              </CardContent>
            </div>
            <Image
              src="/illustrations/doctor-3.svg"
              alt="Health Journey Visualization"
              width={400}
              height={300}
              className="hidden rounded-lg shadow-lg lg:block"
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Platform Benefits</CardTitle>
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
                <CardTitle className="text-xl">Recent Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={patient.image} alt={patient.name} />
                          <AvatarFallback>
                            {patient.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last visit: {patient.lastVisit.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Records
                      </Button>
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
                <CardTitle className="text-xl">Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center text-3xl font-bold">
                    <DollarSign className="mr-2 text-green-500 dark:text-green-400" />
                    {balance.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-24"
                    />
                    <Button
                      onClick={handleWithdraw}
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span className="font-semibold">
                      ${(Math.random() * 2000 + 1000).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">
                      ${(Math.random() * 8000 + 4000).toFixed(2)}
                    </span>
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
              <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <div>
                      <p className="font-semibold">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.startTime.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "CONFIRMED"
                        ? "default"
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
                <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
                  View All Appointments
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
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
