"use client"

import { useState } from "react"
import Link from "next/link"
import { Medication, Prescription } from "@prisma/client"
import { motion } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Pill,
  User,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PrescriptionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  prescription: Omit<
    Prescription & { medications: Medication[] } & {
      doctor: { id: string; user: { name: string | null } }
    },
    "doctorId" | "patientId"
  >
  colorScheme: ColorScheme
}

interface ColorScheme {
  primary: string
  secondary: string
  text: string
}

export function PrescriptionCard({
  prescription,
  colorScheme,
}: PrescriptionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${colorScheme.primary} border-none shadow-lg`}>
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className={`mb-2 text-2xl font-bold ${colorScheme.text}`}>
                Prescription #{prescription.id}
              </h2>
              <div className="mb-2 flex items-center space-x-2">
                <Calendar className={`size-5 ${colorScheme.text}`} />
                <span className={`text-sm ${colorScheme.text}`}>
                  Issued: {prescription.issueDate.toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 flex items-center space-x-2">
                <Clock className={`size-5 ${colorScheme.text}`} />
                <span className={`text-sm ${colorScheme.text}`}>
                  Expires: {prescription.validTill.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className={`size-5 ${colorScheme.text}`} />
                <span className={`text-sm ${colorScheme.text}`}>
                  Dr. {prescription.doctor.user.name} (ID:{" "}
                  {prescription.doctor.id})
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Link
                href={`/dashboard/prescriptions/${prescription.id}`}
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    className: `${colorScheme.secondary} ${colorScheme.text}`,
                  })
                )}
              >
                <ExternalLink className="mr-2 size-4" />
                View Details
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QRCodeSVG
                      // value={`${siteConfig.url}/prescriptions/${prescription.id}`}
                      value={"http://192.168.0.22:3333/meds"}
                      size={64}
                      bgColor="transparent"
                      fgColor={colorScheme.text.replace("text-", "#")}
                      level="L"
                      marginSize={0}
                      className="cursor-help"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scan using our moboile app</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <Badge
              variant="secondary"
              className={`${colorScheme.secondary} ${colorScheme.text}`}
            >
              {prescription.medications.length} Medication(s)
            </Badge>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={`prescription-${prescription.id}-medications`}
              className={colorScheme.text}
            >
              {isExpanded ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
              <span className="hidden md:block">
                {isExpanded ? "Hide" : "Show"} medications
              </span>
            </Button>
          </div>
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            id={`prescription-${prescription.id}-medications`}
          >
            <ul className="space-y-4">
              {prescription.medications.map((medication, index) => (
                <motion.li
                  key={medication.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${colorScheme.secondary} rounded-lg p-4`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${colorScheme.text}`}>
                      {medication.name}
                    </h3>
                    <Pill className={`size-5 ${colorScheme.text}`} />
                  </div>
                  <p className={`text-sm ${colorScheme.text}`}>
                    Dosage: {medication.dosage}
                  </p>
                  <p className={`text-sm ${colorScheme.text}`}>
                    Duration: {medication.duration}
                  </p>
                  {medication.additionalInstructions && (
                    <p className={`text-sm ${colorScheme.text} mt-2`}>
                      Note: {medication.additionalInstructions}
                    </p>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
