"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BadgeCheckIcon,
  ClipboardCheckIcon,
  EyeOffIcon,
  ShieldIcon,
  Stethoscope,
  UserIcon,
} from "lucide-react"
import { signOut } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FeatureItem = ({
  icon: Icon,
  children,
}: {
  icon: any
  children: React.ReactNode
}) => (
  <div className="flex items-center space-x-2">
    <Icon className="size-5 text-blue-400" />
    <span className="text-gray-300">{children}</span>
  </div>
)

export default function RegistrationOptionsSection() {
  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-5xl">
            Join Our Decentralized Healthcare Network
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Whether you&apos;re a patient seeking care or a doctor providing it,
            we have a secure and tailored registration process for you.
          </p>
        </motion.div>

        <Tabs defaultValue="patient" className="mx-auto w-full max-w-4xl">
          <TabsList className="mb-12 grid w-full grid-cols-2 bg-blue-700/20">
            <TabsTrigger value="patient">Register as Patient</TabsTrigger>
            <TabsTrigger value="doctor">Register as Doctor</TabsTrigger>
          </TabsList>
          <div className="relative">
            {/* <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-10" /> */}
            <TabsContent value="patient">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-bold text-white">
                    <UserIcon className="mr-2 size-6 text-blue-400" />
                    Patient Registration
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Secure, anonymous access to global healthcare
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeatureItem icon={ShieldIcon}>
                    Anonymized identity protection
                  </FeatureItem>
                  <FeatureItem icon={EyeOffIcon}>
                    Private and secure medical record storage
                  </FeatureItem>
                  <FeatureItem icon={Stethoscope}>
                    Access to global network of verified doctors
                  </FeatureItem>
                  <div className="mt-4 flex gap-4">
                    <Button
                      onClick={(event) => {
                        event.preventDefault()
                        signOut({
                          callbackUrl: `${window.location.origin}/login`,
                        })
                      }}
                      variant={"destructive"}
                      className="w-full py-4 md:w-36"
                    >
                      Sign Out
                    </Button>
                    <Link
                      href={"/verification/patient"}
                      className={cn(
                        buttonVariants({
                          className:
                            "w-full bg-blue-600 text-white hover:bg-blue-700",
                        })
                      )}
                    >
                      Register as Patient
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="doctor">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-bold text-white">
                    <Stethoscope className="mr-2 size-6 text-blue-400" />
                    Doctor Registration
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Join our global network of verified healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FeatureItem icon={BadgeCheckIcon}>
                    Verification through MBBS ID
                  </FeatureItem>
                  <FeatureItem icon={ClipboardCheckIcon}>
                    Streamlined patient management
                  </FeatureItem>
                  <FeatureItem icon={UserIcon}>
                    Access to a global patient base
                  </FeatureItem>
                  <div className="mt-4 flex gap-4 ">
                    <Button
                      onClick={(event) => {
                        event.preventDefault()
                        signOut({
                          callbackUrl: `${window.location.origin}/login`,
                        })
                      }}
                      variant={"destructive"}
                      className="w-full py-4 md:w-36"
                    >
                      Sign Out
                    </Button>
                    <Link
                      href={"/verification/doctor"}
                      className={cn(
                        buttonVariants({
                          className:
                            "w-full bg-blue-600 text-white hover:bg-blue-700",
                        })
                      )}
                    >
                      Register as Doctor
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
