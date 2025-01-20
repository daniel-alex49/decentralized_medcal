"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Coins, FileText, Lock, Shield, Stethoscope } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) => (
  <Card className="border-gray-700 bg-gray-800">
    <CardHeader>
      <CardTitle className="flex items-center text-xl font-bold text-white">
        <Icon className="mr-2 size-6 text-blue-400" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-gray-400">{description}</CardDescription>
    </CardContent>
  </Card>
)

export function DoctorFeaturesSection() {
  const [rate, setRate] = useState("100")
  const [converted, setConverted] = useState("0")

  return (
    <section className="size-full bg-gray-900 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-5xl">
            Empower Your Practice with Blockchain Technology
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Issue secure prescriptions, receive payments in HTK tokens, and set
            your own rates - all on our decentralized platform.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FeatureCard
              icon={FileText}
              title="Blockchain Prescriptions"
              description="Issue tamper-proof prescriptions stored securely on the blockchain, ensuring authenticity and preventing fraud."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureCard
              icon={Coins}
              title="HTK Token Payments"
              description="Receive payments in HTK, our ERC20 token, enabling fast, secure, and borderless transactions for your services."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FeatureCard
              icon={Lock}
              title="Custom Payment Rates"
              description="Set and adjust your own consultation rates, giving you full control over your practice's pricing."
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto max-w-md"
        >
          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-white">
                <Stethoscope className="mr-2 size-6 text-blue-400" />
                Set Your Consultation Rate
              </CardTitle>
              <CardDescription className="text-gray-400">
                Define your per-hour rate in HTK tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="rate" className="text-white">
                    Hourly Rate (HTK)
                  </Label>
                  <Input
                    id="rate"
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="border-gray-600 bg-gray-700 text-white"
                  />
                </div>
                <Button
                  className="mt-5 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    setConverted(
                      Number((Number.parseInt(rate) * 2674.69) / 100).toFixed(0)
                    )
                  }}
                >
                  Set Rate
                </Button>
              </div>
              {converted != "0" && (
                <p className="mt-2 text-sm text-gray-400">
                  Dollar rate: ${converted} per hour
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href={"/verification/patient"}
            className={cn(
              buttonVariants({
                className: "bg-blue-600 text-white hover:bg-blue-700",
              })
            )}
          >
            <Shield className="mr-2 size-4" />
            Join As Patient Instead
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
