import { notFound, redirect } from "next/navigation"
import { User } from "@prisma/client"

import { dashboardConfig } from "@/config/dashboard"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/shared/main-nav"
import { DashboardNav } from "@/components/shared/nav"
import { SiteFooter } from "@/components/shared/site-footer"
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

  if (role == "doctor") redirect("/doctor")

  return (
    <SidebarProvider>
      <DashboardSidebar user={user as User} />
      <div className="w-full bg-background">
        <header className="flex h-16 items-center justify-between border-b p-4 pr-12 lg:pr-24">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
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
      <Toaster />
    </SidebarProvider>
  )
}
