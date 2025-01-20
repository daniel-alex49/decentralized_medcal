import React from "react"

import { Separator } from "@/components/ui/separator"

const TermsOfServicePage = () => {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <p className="mb-4">Last updated: [Insert Date]</p>

      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using our services, you agree to be bound by these Terms
        of Service. If you do not agree with any part of these terms, you must
        not use our services.
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">2. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these Terms of Service at any time. Any
        changes will be effective immediately upon posting the revised terms.
        Your continued use of the services after any such changes constitutes
        your acceptance of the new Terms.
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        3. User Responsibilities
      </h2>
      <p className="mb-4">
        Users are responsible for maintaining the confidentiality of their
        account information, including passwords. You agree to notify us
        immediately of any unauthorized use of your account or any other breach
        of security.
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        4. Service Availability
      </h2>
      <p className="mb-4">
        We strive to provide uninterrupted access to our services, but we do not
        guarantee that they will always be available or error-free. We reserve
        the right to suspend or discontinue the service at any time without
        notice.
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        To the fullest extent permitted by law, we shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages
        arising from or related to your use of our services.
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">6. Governing Law</h2>
      <p className="mb-4">
        These Terms of Service shall be governed by and construed in accordance
        with the laws of [Insert State/Country]. Any disputes arising under or
        in connection with these terms shall be subject to the exclusive
        jurisdiction of the courts of [Insert State/Country].
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">
        7. Contact Information
      </h2>
      <p className="mb-4">
        If you have any questions about these Terms of Service, please contact
        us at:
        <br />
        Email: support@example.com
      </p>
      <Separator />

      <h2 className="mb-2 mt-4 text-2xl font-semibold">8. Miscellaneous</h2>
      <p className="mb-4">
        If any provision of these Terms is held to be invalid or unenforceable,
        the remaining provisions shall continue in full force and effect. These
        Terms of Service constitute the entire agreement between you and us
        regarding the use of our services.
      </p>
    </div>
  )
}

export default TermsOfServicePage
