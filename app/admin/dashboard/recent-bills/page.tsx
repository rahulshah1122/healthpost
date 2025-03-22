"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Printer, Search, FileDown, Calendar, Clock, User, DollarSign, ClipboardList } from "lucide-react"

// Load bills from localStorage if available
const loadSavedBills = () => {
  if (typeof window !== "undefined") {
    const savedBills = localStorage.getItem("healthpost-bills")
    return savedBills ? JSON.parse(savedBills) : []
  }
  return []
}

// Mock data for recent bills (used if no saved bills)
const mockBills = [
  {
    id: "B001",
    patientName: "John Smith",
    date: "2023-05-15",
    time: "09:45 AM",
    totalAmount: 125.5,
    status: "Paid",
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 5.0, total: 10.0 },
      { name: "Amoxicillin 250mg", quantity: 5, price: 8.5, total: 42.5 },
      { name: "Cetirizine 10mg", quantity: 10, price: 7.3, total: 73.0 },
    ],
  },
  {
    id: "B002",
    patientName: "Maria Garcia",
    date: "2023-05-15",
    time: "11:20 AM",
    totalAmount: 87.25,
    status: "Paid",
    items: [
      { name: "Ibuprofen 400mg", quantity: 3, price: 6.75, total: 20.25 },
      { name: "Omeprazole 20mg", quantity: 2, price: 12.5, total: 25.0 },
      { name: "Multivitamin", quantity: 1, price: 42.0, total: 42.0 },
    ],
  },
  {
    id: "B003",
    patientName: "Robert Johnson",
    date: "2023-05-16",
    time: "10:15 AM",
    totalAmount: 45.0,
    status: "Pending",
    items: [
      { name: "Aspirin 100mg", quantity: 2, price: 4.5, total: 9.0 },
      { name: "Vitamin C", quantity: 1, price: 36.0, total: 36.0 },
    ],
  },
  {
    id: "B004",
    patientName: "Sarah Williams",
    date: "2023-05-16",
    time: "02:30 PM",
    totalAmount: 156.75,
    status: "Paid",
    items: [
      { name: "Metformin 500mg", quantity: 3, price: 9.25, total: 27.75 },
      { name: "Blood Pressure Monitor", quantity: 1, price: 129.0, total: 129.0 },
    ],
  },
  {
    id: "B005",
    patientName: "David Brown",
    date: "2023-05-17",
    time: "09:00 AM",
    totalAmount: 63.5,
    status: "Paid",
    items: [
      { name: "Paracetamol 500mg", quantity: 1, price: 5.0, total: 5.0 },
      { name: "Ibuprofen 400mg", quantity: 2, price: 6.75, total: 13.5 },
      { name: "Antiseptic Solution", quantity: 1, price: 45.0, total: 45.0 },
    ],
  },
]

export default function RecentBills() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBill, setSelectedBill] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [recentBills, setRecentBills] = useState<any[]>([])

  // Load bills on component mount
  useEffect(() => {
    const savedBills = loadSavedBills()
    setRecentBills(savedBills.length > 0 ? savedBills : mockBills)
  }, [])

  // Filter bills based on search query
  const filteredBills = recentBills.filter(
    (bill) =>
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const viewBillDetails = (bill: any) => {
    setSelectedBill(bill)
    setIsDialogOpen(true)
  }

  const printBill = (bill: any) => {
    // In a real app, this would open a print dialog with formatted bill
    alert(`Printing Bill #${bill.id} for ${bill.patientName}`)
  }

  const downloadBill = (bill: any) => {
    // In a real app, this would download a PDF of the bill
    alert(`Downloading Bill #${bill.id} for ${bill.patientName}`)
  }

  // Calculate summary statistics
  const totalBills = recentBills.length
  const totalRevenue = recentBills.reduce((sum, bill) => sum + bill.totalAmount, 0)
  const paidBills = recentBills.filter((bill) => bill.status === "Paid").length
  const pendingBills = recentBills.filter((bill) => bill.status === "Pending").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recent Bills</h1>
        <p className="text-muted-foreground">View and manage billing history</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bills</p>
                <p className="text-3xl font-bold">{totalBills}</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <ClipboardList className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-white border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid Bills</p>
                <p className="text-3xl font-bold">{paidBills}</p>
              </div>
              <div className="p-2 rounded-full bg-emerald-100">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Paid</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Bills</p>
                <p className="text-3xl font-bold">{pendingBills}</p>
              </div>
              <div className="p-2 rounded-full bg-amber-100">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md overflow-hidden">
        <div className="h-2 bg-blue-500"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100">
              <ClipboardList className="h-4 w-4 text-blue-600" />
            </div>
            Bill History
          </CardTitle>
          <CardDescription>View and manage recently generated bills</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by patient name or bill number..."
              className="pl-8 border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Bill #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Date/Time</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No bills found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBills.map((bill) => (
                    <TableRow key={bill.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {bill.id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span>{bill.patientName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{bill.date}</span>
                          <Clock className="h-3 w-3 ml-1 text-muted-foreground" />
                          <span className="text-sm">{bill.time}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">${bill.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={bill.status === "Paid" ? "default" : "secondary"}
                          className={
                            bill.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }
                        >
                          {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewBillDetails(bill)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => printBill(bill)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadBill(bill)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bill Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              Bill Details
            </DialogTitle>
            <DialogDescription>
              {selectedBill && `Bill #${selectedBill.id} - ${selectedBill.patientName}`}
            </DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Patient
                  </p>
                  <p className="font-medium">{selectedBill.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <Clock className="h-3 w-3 ml-1" />
                    Date & Time
                  </p>
                  <p className="font-medium">
                    {selectedBill.date} {selectedBill.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ClipboardList className="h-3 w-3" />
                    Bill Number
                  </p>
                  <p className="font-medium">{selectedBill.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={selectedBill.status === "Paid" ? "default" : "secondary"}
                    className={
                      selectedBill.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                    }
                  >
                    {selectedBill.status}
                  </Badge>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBill.items.map((item: any, index: number) => (
                      <TableRow key={index} className="hover:bg-muted/20">
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={3} className="text-right font-bold">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">${selectedBill.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => printBill(selectedBill)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={() => downloadBill(selectedBill)} className="bg-blue-600 hover:bg-blue-700">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

