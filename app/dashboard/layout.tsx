// In your dashboard layout file
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "./Layout/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar className="hidden md:flex" />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto px-4 mx-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}