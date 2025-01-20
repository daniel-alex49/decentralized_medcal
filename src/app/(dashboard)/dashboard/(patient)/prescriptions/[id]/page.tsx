import Image from "next/image"
import { Medication, Prescription } from "@prisma/client"
import { Mail, MapPin, Phone, Printer, Stethoscope } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"

const prescriptionData: Prescription & { medications: Medication[] } = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  doctorId: "1",
  patientId: "2",
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
}

export default function Component() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <Card className="mx-auto max-w-4xl shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-blue-800 text-primary">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center md:mb-0">
              <Stethoscope className="mr-3 size-10" />
              <div>
                <CardTitle className="text-3xl font-bold text-primary">
                  Dr. Jane Smith
                </CardTitle>
                <p className="text-secondary-foreground">
                  General Practitioner
                </p>
              </div>
            </div>
            <div className="text-sm">
              <div className="mb-1 flex items-center">
                <Phone className="mr-2 size-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="mb-1 flex items-center">
                <Mail className="mr-2 size-4" />
                <span>dr.smith@example.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 size-4" />
                <span>123 Medical Center, City, State 12345</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6 space-y-8">
          <div className="rounded-lg bg-secondary p-6">
            <h2 className="mb-3 text-xl font-semibold text-primary">
              Blockchain Addresses
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-primary">Doctor ID:</p>
                <p className="break-all text-sm">{prescriptionData.doctorId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Patient ID:</p>
                <p className="break-all text-sm">
                  {prescriptionData.patientId}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-primary">
                Prescription Information
              </h2>
              <p className="mb-2">
                <span className="block font-medium">Prescription ID:</span>
                {prescriptionData.id}
              </p>
              <p className="mb-2">
                <span className="font-medium">Issue Date:</span>{" "}
                {prescriptionData.issueDate.toDateString()}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-xl font-semibold text-primary">
                Patient Information
              </h2>
              <p className="mb-2">
                <span className="font-medium">Name:</span> John Doe
              </p>
              <p className="mb-2">
                <span className="font-medium">Age:</span> 35 years
              </p>
              <p>
                <span className="font-medium">Gender:</span> Male
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-primary">
              Medications
            </h2>
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="font-bold text-primary">
                    Medication
                  </TableHead>
                  <TableHead className="font-bold text-primary">
                    Dosage
                  </TableHead>
                  <TableHead className="font-bold text-primary">
                    Duration
                  </TableHead>
                  <TableHead className="font-bold text-primary">
                    Instructions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptionData.medications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell className="font-medium">
                      {medication.name}
                    </TableCell>
                    <TableCell>{medication.dosage}</TableCell>
                    <TableCell>{medication.duration}</TableCell>
                    <TableCell>{medication.additionalInstructions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between border-t pt-6 md:flex-row">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <Image
              src="/logo.svg"
              alt="Doctor's Signature"
              height={50}
              width={50}
              className="object-contain"
            />
            <p className="text-sm font-semibold">Dr. Jane Smith</p>
            <p className="text-xs text-muted-foreground">License No: MD12345</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Icons.logo className="mb-2 size-12" />
            <p className="text-xs text-muted-foreground">Official Stamp</p>
          </div>
        </CardFooter>
      </Card>
      <div className="mx-auto mt-8 max-w-4xl space-y-6 text-sm">
        <Separator className="bg-secondary" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-secondary p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Important Points:
            </h3>
            <ul className="list-inside list-disc space-y-2">
              <li>
                This prescription is valid for the duration specified for each
                medication.
              </li>
              <li>
                Take medications as prescribed. Do not alter dosage without
                consulting your doctor.
              </li>
              <li>
                Report any unusual side effects to your healthcare provider
                immediately.
              </li>
              <li>Keep all medications out of reach of children.</li>
            </ul>
          </div>
          <div className="rounded-lg bg-secondary p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold text-primary">
              Follow-up:
            </h3>
            <p className="mb-2">
              Next appointment:{" "}
              {new Date(
                prescriptionData.issueDate.getTime() + 30 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}{" "}
              at 10:00 AM
            </p>
            <p>For any questions or concerns, please contact our office.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Button className="w-full max-w-4xl bg-blue-600 text-primary hover:bg-blue-700">
          <Printer className="mr-2 size-4" /> Print Prescription
        </Button>
      </div>
    </div>
  )
}
