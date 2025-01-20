"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const complaintsData = [
  {
    title: "Medical Billing Errors",
    content:
      "Patients often face issues with incorrect billing from their healthcare providers. This can include charges for services that were not rendered, discrepancies between what insurance covers and what the patient is billed, and unapproved additional fees. It is crucial for patients to review their medical bills carefully upon receiving them. If you notice any errors or unexpected charges, you should immediately contact your healthcare provider’s billing department. Keeping records of all treatments, payments, and communications regarding your healthcare is essential. If issues persist, patients may contact the [American Medical Association (AMA)](https://www.ama-assn.org/) or their state’s medical board for further guidance on addressing billing concerns.",
    link: "https://www.ama-assn.org/delivering-care/patient-physician-relationship/billing-problems-and-issues",
  },
  {
    title: "Delayed Appointments",
    content:
      "Patients often experience frustration due to repeated delays in their appointment times. It can be especially disheartening when appointments are crucial for ongoing treatment or diagnosis. Patients have the right to timely care, and it is essential to voice concerns about excessive wait times. If a patient is facing repeated delays, they should communicate their experiences to the healthcare provider’s office and request an explanation or resolution. It may also be beneficial to ask if there are alternatives, such as telehealth options, for consultations that do not require an in-person visit. For unresolved issues, patients may reach out to [The Joint Commission](https://www.jointcommission.org/) for further assistance.",
    link: "https://www.jointcommission.org/",
  },
  {
    title: "Confidentiality Breaches",
    content:
      "Patients have a fundamental right to confidentiality concerning their personal health information. However, there may be instances where patients feel that their information has been shared without their explicit consent. This could occur due to careless handling of records, unauthorized access to medical files, or sharing information with third parties without patient consent. If you suspect a confidentiality breach, it is important to take immediate action. Start by contacting the healthcare provider to address the issue directly. Additionally, you can file a complaint with the [Office for Civil Rights (OCR)](https://www.hhs.gov/ocr/) at the U.S. Department of Health and Human Services, which enforces HIPAA privacy rights.",
    link: "https://www.hhs.gov/ocr/index.html",
  },
  {
    title: "Inadequate Informed Consent",
    content:
      "Informed consent is a critical aspect of medical treatment and patient rights. Patients must be provided with comprehensive information regarding the risks, benefits, and alternatives to proposed treatments or procedures before agreeing to proceed. In situations where patients feel they did not receive adequate information, it is crucial to speak up and ask questions. Patients have the right to understand what they are consenting to, and providers have a duty to ensure comprehension. If you believe informed consent was not appropriately obtained, you can contact [The American Board of Medical Specialties (ABMS)](https://www.abms.org/) for advice on how to address the issue.",
    link: "https://www.abms.org/",
  },
  {
    title: "Prescription Errors",
    content:
      "Errors in prescriptions can have serious consequences for patient safety. These errors can include incorrect dosages, wrong medications, or unclear instructions on how to take the prescribed drugs. If you notice any discrepancies in your prescriptions, it is crucial to inform your pharmacist and healthcare provider immediately. Keeping a personal medication record can be beneficial to avoid confusion regarding what has been prescribed. Patients can also report medication errors to the [Institute for Safe Medication Practices (ISMP)](https://www.ismp.org/) for further assistance and to help improve safety in medication management.",
    link: "https://www.ismp.org/",
  },
  {
    title: "Unprofessional Conduct",
    content:
      "Patients expect a certain level of professionalism from healthcare providers. This includes respectful communication, appropriate behavior, and adherence to ethical standards. Instances of unprofessional conduct, such as dismissive behavior, lack of empathy, or inadequate communication about treatment plans, can severely impact the patient-provider relationship. If a patient experiences unprofessional conduct, it is vital to address the issue. You can start by discussing the incident with the provider directly or filing a complaint with the healthcare facility’s administration. For more severe cases, consider reaching out to your state’s medical board or the [American Medical Association (AMA)](https://www.ama-assn.org/).",
    link: "https://www.ama-assn.org/delivering-care/patient-physician-relationship/handling-unprofessional-behavior",
  },
  {
    title: "Failure to Diagnose",
    content:
      "A failure to diagnose a medical condition can lead to severe consequences for a patient’s health. If patients feel that their symptoms were not adequately addressed or that the provider overlooked significant health issues, it is crucial to seek a second opinion. Patients should document all symptoms, previous treatments, and discussions with their healthcare provider to present a comprehensive history when seeking further evaluation. If necessary, patients can escalate the matter by contacting the healthcare facility’s grievance department or a local medical board for further assistance. For more information, the [American Academy of Family Physicians (AAFP)](https://www.aafp.org/) provides resources related to diagnosis and patient rights.",
    link: "https://www.aafp.org/",
  },
  {
    title: "Inadequate Patient Education",
    content:
      "Patients have the right to receive proper education about their health conditions, treatment options, and preventative measures. Inadequate patient education can lead to confusion and hinder patients from making informed decisions about their health. If a patient feels that they did not receive enough information or support regarding their condition, it is vital to communicate this to their healthcare provider. Many healthcare facilities have patient advocates who can assist in ensuring that patients receive the education and resources they need. For additional resources, patients can visit the [National Patient Safety Foundation (NPSF)](https://www.npsf.org/).",
    link: "https://www.npsf.org/",
  },
  {
    title: "Insurance Denials",
    content:
      "Insurance denials can be a frustrating experience for patients seeking necessary medical care. Denials may occur due to various reasons, including lack of prior authorization, out-of-network providers, or insufficient documentation. If a patient receives a denial, it is essential to review the explanation thoroughly and determine the appropriate steps to appeal the decision. Many insurance companies provide a process for appealing denials, and having a detailed record of communications and documentation can aid in this process. For assistance, patients may contact their state’s insurance department or visit the [National Association of Insurance Commissioners (NAIC)](https://www.naic.org/).",
    link: "https://www.naic.org/",
  },
  {
    title: "Discrimination in Healthcare",
    content:
      "Patients are entitled to receive healthcare free from discrimination based on race, gender, sexual orientation, or other personal characteristics. If a patient experiences discriminatory behavior in a healthcare setting, it is crucial to address the issue immediately. Patients can report discriminatory practices to the healthcare provider, or they may contact organizations such as the [U.S. Department of Health & Human Services Office for Civil Rights (OCR)](https://www.hhs.gov/ocr/) for further assistance. Ensuring that all patients receive equitable treatment is paramount in maintaining trust within the healthcare system.",
    link: "https://www.hhs.gov/ocr/",
  },
]

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userTitle, setUserTitle] = useState("")
  const [userContent, setUserContent] = useState("")

  const filteredComplaints = complaintsData.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the submission of the user's complaint
    console.log({ title: userTitle, content: userContent })
    // Reset user inputs
    setUserTitle("")
    setUserContent("")
  }

  return (
    <div className="container mx-auto max-w-3xl space-y-8 p-4">
      <h1 className="mb-6 text-3xl font-bold">Complaints Page</h1>

      <Input
        type="text"
        placeholder="Search for complaints..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <div>
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint, index) => (
            <Card key={index} className="mb-4 shadow-md">
              <CardHeader>
                <h3 className="font-semibold">
                  {highlightText(complaint.title, searchQuery)}
                </h3>
              </CardHeader>
              <CardContent>
                <p>{highlightText(complaint.content, searchQuery)}</p>
              </CardContent>
              <CardFooter>
                <p className="mr-2 rounded-lg bg-secondary p-1 px-2">visit:</p>{" "}
                <a
                  href={complaint.link}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {complaint.link}
                </a>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No complaints found matching your search.</p>
        )}
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Submit Your Own Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Complaint Title"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Describe your complaint..."
            value={userContent}
            onChange={(e) => setUserContent(e.target.value)}
            required
          />
          <Button type="submit" variant="default">
            Submit Complaint
          </Button>
        </form>
      </section>
    </div>
  )
}

function highlightText(text: string, query: string) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-600">
        {part}
      </span>
    ) : (
      part
    )
  )
}
