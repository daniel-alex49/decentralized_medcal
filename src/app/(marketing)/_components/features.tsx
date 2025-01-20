"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ActivityIcon,
  GlobeIcon,
  HeartPulseIcon,
  LockIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
  {
    icon: LockIcon,
    title: "Secure Data Storage",
    description:
      "Your medical data is encrypted and stored on a decentralized network, ensuring maximum security and privacy.",
  },
  {
    icon: UsersIcon,
    title: "Global Doctor Network",
    description:
      "Access a worldwide network of certified healthcare professionals for consultations and second opinions.",
  },
  {
    icon: ActivityIcon,
    title: "Real-time Health Monitoring",
    description:
      "Connect your wearable devices for continuous health tracking and early detection of potential issues.",
  },
  {
    icon: ShieldIcon,
    title: "Patient-Controlled Access",
    description:
      "You have full control over who can access your medical records and for how long.",
  },
  {
    icon: GlobeIcon,
    title: "Borderless Healthcare",
    description:
      "Receive consistent care no matter where you are in the world, with your complete medical history at your fingertips.",
  },
  {
    icon: HeartPulseIcon,
    title: "AI-Powered Health Insights",
    description:
      "Get personalized health recommendations based on your data and the latest medical research.",
  },
]

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            Revolutionizing Healthcare
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform combines cutting-edge blockchain technology with
            healthcare expertise to provide you with unparalleled medical
            assistance.
          </p>
        </motion.div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-12 grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader>
                      <feature.icon
                        className={`mb-2 size-10 ${hoveredIndex === index ? "text-blue-400" : "text-gray-400"} transition-colors duration-300`}
                      />
                      <CardTitle className="text-xl font-bold text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6"
                >
                  <Card className="border-gray-700 bg-gray-800">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <feature.icon className="size-8 text-blue-400" />
                      <div>
                        <CardTitle className="text-xl font-bold text-white">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
