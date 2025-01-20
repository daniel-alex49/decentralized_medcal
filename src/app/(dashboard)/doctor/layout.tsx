import { notFound, redirect } from "next/navigation"
import { User } from "@prisma/client"

import { dashboardConfig } from "@/config/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/shared/main-nav"
import { DashboardSidebar } from "@/components/sidebar"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const { role } = (await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      role: true,
    },
  })) ?? { role: null }

  if (!role || role == "unset") return redirect("/verification")

  return (
    <div className="w-full bg-background">
      <header className="flex h-16 items-center justify-between border-b p-4 pl-8 pr-12 lg:pl-36 lg:pr-24">
        <div className="flex items-center gap-4">
          <Icons.logo className="size-8" />
          <MainNav items={dashboardConfig.mainNav} />
        </div>
        <div className="flex items-center gap-8">
          <ModeToggle />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <main className="relative min-h-screen overflow-hidden p-4">
        {children}
      </main>
    </div>
  )
}
