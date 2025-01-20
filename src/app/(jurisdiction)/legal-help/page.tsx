import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LegalHelpPage() {
  return (
    <div className="container  mx-auto max-w-3xl space-y-8 p-4">
      {/* <Breadcrumb
        
      /> */}

      <h1 className="mb-6 text-3xl font-bold">Legal Help</h1>

      <p>
        This page serves as a comprehensive guide for both patients and doctors,
        providing essential information about legal rights, best practices, and
        resources for resolving issues that may arise in the healthcare setting.
      </p>

      <section>
        <h2 className="mt-4 text-2xl font-semibold">
          Best Practices for Patients
        </h2>
        <p>
          Patients are encouraged to follow these best practices to ensure their
          rights are protected and that they receive safe and effective care:
        </p>
        <Card className="mb-4 shadow-md">
          <CardHeader>
            <h3 className="font-semibold">Key Practices:</h3>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc">
              <li>
                Provide accurate personal and medical information during
                registration.
              </li>
              <li>
                Understand your rights regarding consent and confidentiality.
              </li>
              <li>
                Your identity is secured through blockchain technology,
                enhancing your privacy.
              </li>
              <li>
                Know that prescriptions can only be used at our trusted online
                stores.
              </li>
              <li>Keep your health records and prescriptions confidential.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mt-4 text-2xl font-semibold">
          Best Practices for Doctors
        </h2>
        <p>
          Doctors should adhere to the following best practices to maintain
          professional standards and protect patient rights:
        </p>
        <Card className="mb-4 shadow-md">
          <CardHeader>
            <h3 className="font-semibold">Key Practices:</h3>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc">
              <li>Comply with medical regulations and legal requirements.</li>
              <li>
                Ensure patient confidentiality and secure sensitive information.
              </li>
              <li>
                Clearly communicate treatment options and prescription
                information.
              </li>
              <li>
                Issue prescriptions only for medications available at our
                trusted online stores.
              </li>
              <li>
                Stay informed about the best practices in telemedicine and
                digital health records.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mt-4 text-2xl font-semibold">
          Patient Identity Anonymity Through Blockchain
        </h2>
        <p>
          Blockchain technology offers a significant advantage by protecting
          patient identity and ensuring privacy. Here’s how:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            Encrypted storage of patient identities on the blockchain ensures
            security.
          </li>
          <li>
            Access to sensitive information is restricted to authorized
            personnel only.
          </li>
          <li>
            Patients can control who has access to their data, promoting trust
            and security.
          </li>
          <li>
            This anonymity prevents discrimination and maintains patient
            dignity.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mt-4 text-2xl font-semibold">
          Valid Prescriptions for Trusted Online Stores
        </h2>
        <p>
          Prescriptions issued through our platform are valid only at our
          trusted online stores. This policy ensures:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            Medication safety and authenticity to prevent counterfeit drugs.
          </li>
          <li>Compliance with local and national pharmacy regulations.</li>
          <li>
            Patients receive correct dosages and medications as prescribed.
          </li>
          <li>Enhanced tracking of prescriptions for better patient care.</li>
        </ul>
      </section>

      <section>
        <h2 className="mt-4 text-2xl font-semibold">
          Resources and Legal Authorities
        </h2>
        <p>
          If you encounter any legal issues or need further assistance, you can
          refer to the following legal authorities based on your situation:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            <a
              href="https://www.hhs.gov/ocr/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              U.S. Department of Health and Human Services - Office for Civil
              Rights (OCR)
            </a>
            : For complaints regarding privacy violations and discrimination.
          </li>
          <li>
            <a
              href="https://www.cms.gov/medicare/coverage/medicare-coverage-database"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Centers for Medicare & Medicaid Services (CMS)
            </a>
            : For issues related to Medicare and Medicaid coverage.
          </li>
          <li>
            <a
              href="https://www.ama-assn.org/delivering-care/public-health/medical-board-complaints"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              American Medical Association (AMA)
            </a>
            : For complaints against physicians.
          </li>
          <li>
            <a
              href="https://www.consumerfinance.gov/complaint/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Consumer Financial Protection Bureau (CFPB)
            </a>
            : For complaints related to healthcare billing and insurance.
          </li>
        </ul>
      </section>

      <Button variant="default" className="mt-6">
        Contact Legal Support
      </Button>
    </div>
  )
}
