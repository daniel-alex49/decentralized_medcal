import { User } from "@prisma/client"
import type { Icon } from "lucide-react"
import { MongoClient } from "mongodb"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

export type PatientDashboardData = {
  id: string
  userId: string
  name: string | null
  email: string | null
  image: string | null
  gender: string
  dateOfBirth: Date
  bloodType: string | null
  chronicDiseases: string[]
  emergencyContact: string
  blockId: string
}

export type DoctorData = {
  id: string
  userId: string
  name: string | null
  joinDate: Date
  prescriptionsIssued: number
  phoneNumber: string
  aadharNumber: string
  mbbsId: string
  specialty: string
  verified: boolean
  blockId: string
}
