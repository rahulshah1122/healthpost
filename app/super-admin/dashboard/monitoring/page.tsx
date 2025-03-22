"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, Ticket, Receipt, AlertTriangle } from "lucide-react"

// Mock data for charts and statistics
const medicineSalesData = [
  { name: "Paracetamol 500mg", sales: 1250, revenue: 6250 },
  { name: "Amoxicillin 250mg", sales: 850, revenue: 7225 },
  { name: "Ibuprofen 400mg", sales: 1100, revenue: 7425 },
  { name: "Cetirizine 10mg", sales: 600, revenue: 4350 },
  { name: "Omeprazole 20mg", sales: 450, revenue: 5625 },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14200 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 13600 },
  { month: "May", revenue: 16900 },
  { month: "Jun", revenue: 18200 },
]

const systemMetrics = {
  totalTickets: 1250,
  totalBills: 980,
  averageTicketsPerDay: 42,
  averageBillAmount: 85.75,
  lowStockItems: 3,
  outOfStockItems: 1,
}

export default function SystemMonitoring() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Monitoring</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalTickets}</div>
            <p className="text-xs text-muted-foreground">{systemMetrics.averageTicketsPerDay} tickets per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalBills}</div>
            <p className="text-xs text-muted-foreground">${systemMetrics.averageBillAmount} average bill amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">{systemMetrics.outOfStockItems} items out of stock</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Medicine Sales
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Revenue Trends
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Inventory Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Medicines</CardTitle>
              <CardDescription>Sales volume and revenue for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* In a real app, this would be a chart component */}
                <div className="space-y-4">
                  {medicineSalesData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.sales} units</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${(item.sales / 1250) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm text-right text-muted-foreground">Revenue: ${item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* In a real app, this would be a chart component */}
                <div className="flex h-[250px] items-end gap-2">
                  {monthlyRevenueData.map((item, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary rounded-t-md"
                        style={{ height: `${(item.revenue / 20000) * 100}%` }}
                      />
                      <span className="text-sm font-medium">{item.month}</span>
                      <span className="text-xs text-muted-foreground">${item.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock levels and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* In a real app, this would be a chart component */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Stock Distribution by Type</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Tablets</span>
                          <span className="text-sm text-muted-foreground">60%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Capsules</span>
                          <span className="text-sm text-muted-foreground">25%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Syrups</span>
                          <span className="text-sm text-muted-foreground">10%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Others</span>
                          <span className="text-sm text-muted-foreground">5%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: "5%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Stock Level Status</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Adequate Stock</span>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "75%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Low Stock</span>
                          <span className="text-sm text-muted-foreground">20%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-yellow-500" style={{ width: "20%" }} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Out of Stock</span>
                          <span className="text-sm text-muted-foreground">5%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: "5%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

