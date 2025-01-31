import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

import ChatApp from "./chat"

export default async function ChatPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return (
    <div>
      <ChatApp user={user} />
    </div>
  )
}
