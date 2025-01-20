"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { ChevronRight, Globe, Network, Shield, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [text])

  return <span>{displayText}</span>
}

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-20"
          style={{
            width: Math.random() * 5 + "px",
            height: Math.random() * 5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

const StatItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: any
  value: string
  label: string
}) => (
  <motion.div
    className="flex flex-col items-center space-y-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="size-8 text-blue-400" />
    <span className="text-2xl font-bold text-white">{value}</span>
    <span className="text-sm text-gray-400">{label}</span>
  </motion.div>
)

export default function HeroSection() {
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        controls.start({ opacity: 1, y: 0 })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-12 pt-6 md:py-24">
      <ParticlesBackground />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                <TypewriterText text="Decentralized Healthcare" />
                <br />
                <span className="text-blue-400"> Redefined</span>
              </h1>
              <p className="max-w-[600px] text-gray-400 md:text-xl">
                Secure, transparent, and accessible medical assistance through
                blockchain technology. Empowering patients and healthcare
                providers worldwide.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href={"/dashboard"}
                className={cn(
                  buttonVariants({
                    className:
                      "inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50",
                  })
                )}
              >
                Get Started
                <ChevronRight className="ml-2 size-4" />
              </Link>
              <Button
                variant="outline"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-8 text-sm font-medium text-gray-200 shadow-lg transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[500px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-60 blur-2xl"></div>
              <motion.div
                className="relative flex aspect-square items-center justify-center rounded-xl p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Icons.logo className="size-3/4 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <StatItem icon={Users} value="100,000+" label="Active Users" />
          <StatItem icon={Shield} value="99.9%" label="Data Security" />
          <StatItem icon={Globe} value="50+" label="Countries Served" />
        </motion.div>
      </div>

      <motion.div
        className="mt-16 rounded-lg bg-gray-800 px-4 py-8 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="mb-4 text-center text-2xl font-bold text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Connect",
              description: "Link your medical data securely to our blockchain.",
            },
            {
              title: "Consult",
              description:
                "Get expert medical advice from global professionals.",
            },
            {
              title: "Control",
              description:
                "Maintain full ownership of your health information.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="rounded-lg bg-gray-700 p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="mb-2 text-xl font-semibold text-blue-400">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
