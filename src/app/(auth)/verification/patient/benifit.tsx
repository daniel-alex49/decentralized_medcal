"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, Globe, Shield, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PatientFeaturesSection() {
  const [symptom, setSymptom] = useState("")

  return (
    <section className="min-h-screen w-full bg-[#0f172a] py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tighter text-white drop-shadow-lg md:text-5xl">
            Empower Your Health with Blockchain Technology
          </h1>
          <p className="mx-auto max-w-[800px] text-gray-400 md:text-xl/relaxed">
            Access secure medical records, connect with global healthcare
            professionals, and take control of your health journey - all on our
            decentralized platform.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-blue-900/20 bg-[#1a2642] p-6"
          >
            <Shield className="mb-4 size-10 text-blue-400" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              Secure Medical Records
            </h3>
            <p className="text-gray-400">
              Your medical history stored securely on the blockchain, ensuring
              privacy and preventing unauthorized access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-blue-900/20 bg-[#1a2642] p-6"
          >
            <Users className="mb-4 size-10 text-blue-400" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              Global Doctor Network
            </h3>
            <p className="text-gray-400">
              Connect with verified healthcare professionals worldwide for
              consultations and second opinions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg border border-blue-900/20 bg-[#1a2642] p-6"
          >
            <Activity className="mb-4 size-10 text-blue-400" />
            <h3 className="mb-2 text-xl font-semibold text-white">
              Health Tracking
            </h3>
            <p className="text-gray-400">
              Monitor your vital signs and health metrics in real-time, with
              AI-powered insights and recommendations.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-md rounded-lg border border-blue-900/20 bg-[#1a2642] p-6"
        >
          <div className="mb-4 flex items-center">
            <Globe className="mr-2 size-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">
              Quick Symptom Check
            </h3>
          </div>
          <p className="mb-4 text-gray-400">
            Enter your symptoms for instant AI-powered health advice
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href={"/verification/doctor"}
            className={cn(
              buttonVariants({
                className: "bg-blue-600 text-white hover:bg-blue-700",
              })
            )}
          >
            <Shield className="mr-2 size-4" />
            Join As Doctor Instead
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
