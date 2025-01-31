"use client"

import { useEffect, useState } from "react"
import { DoctorData } from "@/types"
import axios from "axios"
import { format } from "date-fns"
import { Search } from "lucide-react"

import { sampleDoctors } from "@/lib/demidata"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

interface AppointmentFormData {
  date: string
  time: string
}

// API Functions
const getDoctorRecommendation = async (symptoms: string): Promise<string> => {
  try {
    const response = await fetch("http://127.0.0.1:5000/get_recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem: symptoms }),
    })

    if (!response.ok) throw new Error("Failed to get recommendation")

    const data = await response.json()
    return data?.doctors[0] ?? "Neurosurgeon"
  } catch (error) {
    console.error("Recommendation error:", error)
    throw error
  }
}

export default function AppointmentBookingPage() {
  // State
  const [doctors, setDoctors] = useState<DoctorData[]>(sampleDoctors)
  const [searchQuery, setSearchQuery] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null)
  const [formData, setFormData] = useState<AppointmentFormData>({
    date: "",
    time: "",
  })
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(true)

  const { toast } = useToast()

  // Effects
  useEffect(() => {
    fetchDoctors()
  }, [])

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setIsFetchingDoctors(true)
      const response = await axios.get("/api/doctors")
      setDoctors([...doctors, ...response.data])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch doctors. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsFetchingDoctors(false)
    }
  }

  // Filter doctors based on search
  const filteredDoctors = doctors.filter((doctor) => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      doctor?.name?.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm)
    )
  })

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAIRecommendation = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter your symptoms",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const specialty = await getDoctorRecommendation(symptoms)
      setSearchQuery(specialty)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI recommendation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all appointment details",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const startTime = new Date(`${formData.date}T${formData.time}`)
      const endTime = new Date(startTime.getTime() + 30 * 60000)

      const response = await axios.post("/api/appointments", {
        doctorId: selectedDoctor.id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      })

      if (response.status !== 201) {
        toast({
          title: "Error",
          description: "Failed to book appointment",
          variant: "destructive",
        })
      }

      toast({
        title: "Success",
        description: "Appointment booked successfully!",
      })
      setIsBookingDialogOpen(false)
      setFormData({ date: "", time: "" })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto space-y-8 p-4">
      <Toaster />
      <h1 className="text-2xl font-bold">Book an Appointment</h1>

      {/* Search Section */}
      <div className="mb-6 flex items-center gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by doctor name or specialty"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Ask AI ✨</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Recommendation ✨</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Describe your symptoms</Label>
                <Textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Please describe your symptoms in detail"
                  required
                  rows={6}
                />
              </div>
              <DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleAIRecommendation}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Getting recommendation..."
                    : "Get Recommendation"}
                </Button>
              </DialogClose>
              <DialogClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Doctor List */}
      <section className="space-y-4">
        {isFetchingDoctors ? (
          // Loading state
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="relative transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>Specialty: {doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Join Date:</strong>{" "}
                    {format(new Date(doctor.joinDate), "MMMM dd, yyyy")}
                  </p>
                  <p>
                    <strong>Prescriptions Issued:</strong>{" "}
                    {doctor.prescriptionsIssued.toLocaleString()}
                  </p>
                  <Badge variant="outline">{doctor.specialty}</Badge>
                </div>
                <Button
                  className="absolute bottom-5 right-5"
                  onClick={() => {
                    setSelectedDoctor(doctor)
                    setIsBookingDialogOpen(true)
                  }}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No doctors found matching your search criteria.
          </p>
        )}
      </section>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Selected Doctor</Label>
              <Input
                value={selectedDoctor?.name || ""}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Time</Label>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              onClick={handleBookAppointment}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
