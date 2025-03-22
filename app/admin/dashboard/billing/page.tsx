"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Printer, Plus, Trash2, Search } from "lucide-react"

// Mock data for medicines
const availableMedicines = [
  { id: 1, name: "Paracetamol 500mg", type: "Tablet", price: 5.0, stock: 500 },
  { id: 2, name: "Amoxicillin 250mg", type: "Capsule", price: 8.5, stock: 300 },
  { id: 3, name: "Ibuprofen 400mg", type: "Tablet", price: 6.75, stock: 450 },
  { id: 4, name: "Cetirizine 10mg", type: "Tablet", price: 7.25, stock: 200 },
  { id: 5, name: "Omeprazole 20mg", type: "Capsule", price: 12.5, stock: 150 },
]

interface BillItem {
  id: number
  medicineId: number
  name: string
  price: number
  quantity: number
  total: number
}

// In a real app, this would be stored in a database
// For this demo, we'll use localStorage to persist bills between page refreshes
const loadSavedBills = () => {
  if (typeof window !== "undefined") {
    const savedBills = localStorage.getItem("healthpost-bills")
    return savedBills ? JSON.parse(savedBills) : []
  }
  return []
}

const saveBills = (bills: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("healthpost-bills", JSON.stringify(bills))
  }
}

export default function MedicineBilling() {
  const { toast } = useToast()
  const [billItems, setBillItems] = useState<BillItem[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [patientName, setPatientName] = useState("")
  const [patientId, setPatientId] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [billTotal, setBillTotal] = useState(0)
  const [generatedBills, setGeneratedBills] = useState<any[]>([])

  // Load saved bills on component mount
  useEffect(() => {
    setGeneratedBills(loadSavedBills())
  }, [])

  // Filter medicines based on search query
  const filteredMedicines = availableMedicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Update bill total whenever bill items change
  useEffect(() => {
    const total = billItems.reduce((sum, item) => sum + item.total, 0)
    setBillTotal(total)
  }, [billItems])

  const addItemToBill = () => {
    if (!selectedMedicine) return

    const medicineId = Number.parseInt(selectedMedicine)
    const medicine = availableMedicines.find((m) => m.id === medicineId)

    if (!medicine) return

    const newItem: BillItem = {
      id: Date.now(), // Use timestamp as unique ID
      medicineId: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: quantity,
      total: medicine.price * quantity,
    }

    setBillItems([...billItems, newItem])
    setSelectedMedicine("")
    setQuantity(1)
  }

  const removeItem = (itemId: number) => {
    setBillItems(billItems.filter((item) => item.id !== itemId))
  }

  const generateBill = () => {
    if (billItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one medicine to the bill",
        variant: "destructive",
      })
      return
    }

    if (!patientName) {
      toast({
        title: "Error",
        description: "Please enter patient name",
        variant: "destructive",
      })
      return
    }

    // Create a new bill
    const newBill = {
      id: `B${String(generatedBills.length + 1).padStart(3, "0")}`,
      patientName,
      patientId: patientId || "N/A",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      totalAmount: billTotal,
      status: "Paid",
      items: [...billItems],
    }

    // Add to generated bills
    const updatedBills = [...generatedBills, newBill]
    setGeneratedBills(updatedBills)
    saveBills(updatedBills)

    // Show success message
    toast({
      title: "Bill Generated",
      description: `Bill #${newBill.id} for ${patientName} has been created.`,
    })

    // Reset form after generating bill
    setBillItems([])
    setPatientName("")
    setPatientId("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Medicine Billing</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID (Optional)</Label>
                <Input id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Medicines</CardTitle>
              <CardDescription>Search and add medicines to the current bill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search medicines..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicine">Select Medicine</Label>
                <Select value={selectedMedicine} onValueChange={setSelectedMedicine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredMedicines.map((medicine) => (
                      <SelectItem key={medicine.id} value={medicine.id.toString()}>
                        {medicine.name} - ${medicine.price.toFixed(2)} ({medicine.stock} in stock)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={addItemToBill} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add to Bill
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Bill</CardTitle>
            <CardDescription>Review and finalize the current bill</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No items added to bill yet
                    </TableCell>
                  </TableRow>
                ) : (
                  billItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-lg font-bold">${billTotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={generateBill} className="flex-1 gap-2">
              <Printer className="h-4 w-4" />
              Generate & Print Bill
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

