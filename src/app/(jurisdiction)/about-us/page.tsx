"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Globe, Heart, Leaf, Shield, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const IconWrapper = ({ children, color }) => (
  <div className={`rounded-full p-2 ${color} shadow-lg`}>{children}</div>
)

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            We&apos;re revolutionizing healthcare with blockchain technology,
            making it more accessible, secure, and patient-centric.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-white/10 p-8 shadow-xl backdrop-blur-lg"
          >
            <IconWrapper color="bg-pink-500">
              <Heart className="size-8 text-white" />
            </IconWrapper>
            <h2 className="mb-2 mt-4 text-2xl font-semibold text-white">
              Our Mission
            </h2>
            <p className="text-gray-300">
              To empower individuals with control over their health data and
              provide seamless access to global healthcare services through
              innovative blockchain solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl bg-white/10 p-8 shadow-xl backdrop-blur-lg"
          >
            <IconWrapper color="bg-blue-500">
              <Globe className="size-8 text-white" />
            </IconWrapper>
            <h2 className="mb-2 mt-4 text-2xl font-semibold text-white">
              Our Vision
            </h2>
            <p className="text-gray-300">
              A world where healthcare is borderless, patient data is secure and
              portable, and medical expertise is accessible to all, regardless
              of geographical boundaries.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-8 text-3xl font-semibold text-white">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Shield, color: "bg-green-500", text: "Security" },
              { icon: Users, color: "bg-yellow-500", text: "Accessibility" },
              { icon: Zap, color: "bg-purple-500", text: "Innovation" },
              { icon: Leaf, color: "bg-teal-500", text: "Sustainability" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <IconWrapper color={item.color}>
                  <item.icon className="size-8 text-white" />
                </IconWrapper>
                <span className="mt-2 text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Team collaboration"
            width={800}
            height={400}
            className="h-64 w-full rounded-xl object-cover md:h-96"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Join Us in Transforming Healthcare
            </h2>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Our Team",
              description: "Meet the passionate individuals behind our mission",
              link: "/team",
            },
            {
              title: "Partnerships",
              description:
                "Discover our collaborations with leading healthcare providers",
              link: "/partnerships",
            },
            {
              title: "Technology",
              description:
                "Learn about the blockchain technology powering our platform",
              link: "/technology",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <Card className="border-none bg-white/10 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <a href={card.link}>Learn More</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
