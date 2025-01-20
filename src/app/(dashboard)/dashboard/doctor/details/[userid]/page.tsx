"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

type Section = {
  title: string
  content: React.ReactNode
}

export default function MedicalHistoryBlur() {
  const [clickedSections, setClickedSections] = useState<Set<number>>(new Set())
  const [unlockedSections, setUnlockedSections] = useState<Set<number>>(
    new Set()
  )

  const handleSectionClick = (index: number) => {
    if (clickedSections.has(index)) {
      // Second click: unlock the section
      setUnlockedSections((prev) => new Set(prev).add(index))
      setClickedSections((prev) => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    } else {
      // First click: show notification
      setClickedSections((prev) => new Set(prev).add(index))
      toast("Notification Sent", {
        description: "A notification has been sent to the patient.",
        action: {
          label: "Undo",
          onClick: () => {
            setClickedSections((prev) => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          },
        },
      })
    }
  }

  const sections: Section[] = [
    {
      title: "Personal Information",
      content: (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Personal Information
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Name: John Doe <br />
            Age: 35 <br />
            Gender: Male
          </p>
        </>
      ),
    },
    {
      title: "Medical Conditions",
      content: (
        <>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Medical Conditions
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Diagnosed conditions:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Diabetes Mellitus</li>
            <li>Hypertension</li>
            <li>Asthma</li>
          </ul>
        </>
      ),
    },
    {
      title: "Medications",
      content: (
        <>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Medications
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Currently prescribed medications:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Metformin 500mg twice daily</li>
            <li>Lisinopril 10mg once daily</li>
            <li>Albuterol inhaler as needed</li>
          </ul>
        </>
      ),
    },
    {
      title: "Surgeries",
      content: (
        <>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Surgeries
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Previous surgeries:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Appendectomy - 2010</li>
            <li>ACL Reconstruction - 2015</li>
          </ul>
        </>
      ),
    },
    {
      title: "Allergies",
      content: (
        <>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Allergies
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Known allergies:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Penicillin</li>
            <li>Peanuts</li>
          </ul>
        </>
      ),
    },
    {
      title: "Family History",
      content: (
        <>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Family History
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Family history of medical conditions:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Father: Hypertension</li>
            <li>Mother: Type 2 Diabetes</li>
            <li>Grandmother: Alzheimer&apos;s disease</li>
          </ul>
        </>
      ),
    },
  ]

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12">
      {sections.map((section, index) => (
        <div key={index} className="relative rounded-lg border p-4 md:p-6">
          <div
            className={`transition-all duration-300 ${unlockedSections.has(index) ? "" : "blur-md"}`}
            aria-hidden={!unlockedSections.has(index)}
          >
            {section.content}
          </div>
          {!unlockedSections.has(index) && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
              <Button
                onClick={() => handleSectionClick(index)}
                aria-label={
                  clickedSections.has(index)
                    ? `Unlock ${section.title}`
                    : `Request access to ${section.title}`
                }
              >
                {clickedSections.has(index)
                  ? `Unlock ${section.title}`
                  : `Request Access`}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
