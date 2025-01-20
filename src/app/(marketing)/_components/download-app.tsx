"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AppleIcon, BellIcon, PhoneIcon, SmartphoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AppDownloadSection() {
  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                Never Miss a Dose Again
              </h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Download our app and stay on top of your medication schedule.
                Get timely reminders and manage your health with ease.
              </p>
            </div>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-3">
                <BellIcon className="size-5 text-blue-400" />
                <span>Personalized medication reminders</span>
              </li>
              <li className="flex items-center space-x-3">
                <SmartphoneIcon className="size-5 text-blue-400" />
                <span>Easy-to-use mobile interface</span>
              </li>
              <li className="flex items-center space-x-3">
                <BellIcon className="size-5 text-blue-400" />
                <span>Sync with your doctor&apos;s prescriptions</span>
              </li>
            </ul>
            <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="inline-flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700">
                <AppleIcon className="mr-2 size-5" />
                Download for iOS
              </Button>
              <Button className="inline-flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700">
                <PhoneIcon className="mr-2 size-5" />
                Download for Android
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-[9/16] w-full max-w-screen-xs">
              <Image
                src="/veil_application.jpeg"
                alt="App Screenshot"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
              <motion.div
                className="absolute inset-x-4 bottom-4 rounded-xl bg-gray-800/90 p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="mb-2 font-semibold text-white">
                  Medication Reminder
                </h3>
                <p className="text-sm text-gray-300">
                  Time to take your evening dose of Aspirin
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
