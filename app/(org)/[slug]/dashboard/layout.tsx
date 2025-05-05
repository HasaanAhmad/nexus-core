// In your dashboard layout file
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "./Layout/Header"
import { redirect } from "next/navigation"
import { auth } from "@/server/auth"
import { getOnboardingState } from "@/actions/UserActions"
import { prisma } from "@/server/prisma"
import { StoreProvider } from "./Layout/StoreProvider"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    redirect("/sign-in")
  }

  const onboardingState = await getOnboardingState()
  if (!onboardingState?.onboardingCompleted) {
    redirect("/onboarding")
  }

  // Fetch organization data if the user has an organizationId
  let organization = null
  if (session.user.organizationId) {
    organization = await prisma.organization.findUnique({
      where: { id: session.user.organizationId }
    })
  }

  return (
    <SidebarProvider>
      <StoreProvider userData={session.user} organizationData={organization}>
        <div className="min-h-screen flex w-full">
          <AppSidebar className="hidden md:flex" />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto px-4 mx-4">
              {children}
            </main>
          </div>
        </div>
      </StoreProvider>
    </SidebarProvider>
  )
}