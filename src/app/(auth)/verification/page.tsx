import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

import RegistrationOptionsSection from "./select-role"

export default async function Component() {
  const user = await getCurrentUser()
  if (!user || !user.id) return redirect("/login")

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <RegistrationOptionsSection />
    </div>
  )
}
