import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell className="relative h-[80vh]">
      <DashboardHeader
        heading="Loading..."
        text="Please wait a minute while we fetch the details"
      >
        <Link
          href="/dashboard/appointments/book"
          className={cn(buttonVariants())}
        >
          <Icons.add className="mr-2 size-4" />
          Book Appointment
        </Link>
      </DashboardHeader>
      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2">
        <Icons.logo className="m-auto size-40 animate-pulse" />
      </div>
    </DashboardShell>
  )
}
