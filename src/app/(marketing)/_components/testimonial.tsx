"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Dr. Emily Chen",
    role: "Cardiologist",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "This platform has revolutionized how I collaborate with colleagues globally. The secure data sharing and AI insights have significantly improved my diagnostic accuracy.",
  },
  {
    name: "John Doe",
    role: "Patient",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "I've never felt more in control of my health. The ability to securely share my medical history with doctors anywhere in the world has been life-changing.",
  },
  {
    name: "Dr. Michael Johnson",
    role: "Neurologist",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The AI-powered health insights have helped me catch potential issues early in my patients. It's like having a brilliant assistant that never sleeps.",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <section className="w-full bg-gray-800 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-white sm:text-5xl">
            What Our Users Say
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hear from healthcare professionals and patients who have experienced
            the power of our decentralized medical platform.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg bg-gray-700 p-6 shadow-lg"
            >
              <Quote className="mb-4 size-12 text-blue-400" />
              <p className="mb-4 text-lg text-white">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center">
                <Avatar className="mr-4 size-12">
                  <AvatarImage
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                  />
                  <AvatarFallback>
                    {testimonials[currentIndex].name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              <ChevronLeft className="mr-2 size-4" /> Previous
            </Button>
            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Next <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
