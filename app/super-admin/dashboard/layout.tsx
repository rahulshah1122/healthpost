import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pill, BarChart3, LogOut } from "lucide-react"

interface SuperAdminLayoutProps {
  children: ReactNode
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">HealthPost Super Admin</h1>
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="gap-1">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <nav className="p-4 space-y-2">
            <Link href="/super-admin/dashboard" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Pill className="h-4 w-4" />
                Medicine Management
              </Button>
            </Link>
            <Link href="/super-admin/dashboard/monitoring" passHref>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-4 w-4" />
                System Monitoring
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

