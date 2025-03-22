import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, Receipt, ClipboardList, Home, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navItems = [
    { href: "/admin/dashboard", icon: Ticket, label: "Ticket Generation" },
    { href: "/admin/dashboard/billing", icon: Receipt, label: "Medicine Billing" },
    { href: "/admin/dashboard/recent-bills", icon: ClipboardList, label: "Recent Bills" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6 bg-blue-600 text-white">
                  <h2 className="text-xl font-bold">HealthPost Admin</h2>
                </div>
                <nav className="p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <Link key={index} href={item.href} passHref>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                  <Link href="/" passHref>
                    <Button variant="ghost" className="w-full justify-start gap-2 mt-4">
                      <Home className="h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">HealthPost Admin</h1>
          </div>
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="gap-1 text-white hover:bg-blue-700">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/20 hidden md:block">
          <nav className="p-4 space-y-2 sticky top-16">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} passHref>
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-600">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t">
              <Link href="/" passHref>
                <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 bg-muted/5">{children}</main>
      </div>
    </div>
  )
}

