import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, Ticket, Pill, BarChart3, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">HealthPost Management System</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            A comprehensive solution for managing health post operations, patient tickets, and medicine inventory
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="h-2 bg-blue-500"></div>
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Shield className="h-5 w-5" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>Manage tickets and billing operations</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Features:</h3>
                  <ul className="grid gap-2 list-none">
                    {[
                      { icon: Ticket, text: "Generate and manage patient tickets" },
                      { icon: Pill, text: "Process medicine billing" },
                      { icon: BarChart3, text: "View billing history and reports" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                          <item.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 pb-6">
              <Link href="/admin/login" passHref className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Access Admin Panel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="h-2 bg-emerald-500"></div>
            <CardHeader className="bg-muted/30">
              <CardTitle className="flex items-center gap-2 text-emerald-600">
                <Shield className="h-5 w-5" />
                Super Admin Dashboard
              </CardTitle>
              <CardDescription>Manage system settings and inventory</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Features:</h3>
                  <ul className="grid gap-2 list-none">
                    {[
                      { icon: Pill, text: "Manage medicine inventory" },
                      { icon: Ticket, text: "Update medicine prices and details" },
                      { icon: BarChart3, text: "Monitor sales and system performance" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                          <item.icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 pb-6">
              <Link href="/super-admin/login" passHref className="w-full">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Access Super Admin Panel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">&copy; {new Date().getFullYear()} HealthPost Management System</p>
          <p className="text-sm">A comprehensive solution for healthcare management</p>
        </div>
      </footer>
    </div>
  )
}

