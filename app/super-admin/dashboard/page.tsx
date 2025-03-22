"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

// Mock data for medicines
const initialMedicines = [
  { id: 1, name: "Paracetamol 500mg", type: "Tablet", price: 5.0, stock: 500 },
  { id: 2, name: "Amoxicillin 250mg", type: "Capsule", price: 8.5, stock: 300 },
  { id: 3, name: "Ibuprofen 400mg", type: "Tablet", price: 6.75, stock: 450 },
  { id: 4, name: "Cetirizine 10mg", type: "Tablet", price: 7.25, stock: 200 },
  { id: 5, name: "Omeprazole 20mg", type: "Capsule", price: 12.5, stock: 150 },
]

export default function MedicineManagement() {
  const [medicines, setMedicines] = useState(initialMedicines)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingMedicine, setEditingMedicine] = useState<null | number>(null)

  // New medicine form state
  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newStock, setNewStock] = useState("")

  // Edit medicine form state
  const [editName, setEditName] = useState("")
  const [editType, setEditType] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editStock, setEditStock] = useState("")

  // Filter medicines based on search query
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault()

    const newMedicine = {
      id: Date.now(),
      name: newName,
      type: newType,
      price: Number.parseFloat(newPrice) || 0,
      stock: Number.parseInt(newStock) || 0,
    }

    setMedicines([...medicines, newMedicine])

    // Reset form
    setNewName("")
    setNewType("")
    setNewPrice("")
    setNewStock("")
  }

  const startEditing = (medicineId: number) => {
    const medicine = medicines.find((m) => m.id === medicineId)
    if (!medicine) return

    setEditingMedicine(medicineId)
    setEditName(medicine.name)
    setEditType(medicine.type)
    setEditPrice(medicine.price.toString())
    setEditStock(medicine.stock.toString())
  }

  const saveEdit = () => {
    if (editingMedicine === null) return

    setMedicines(
      medicines.map((medicine) =>
        medicine.id === editingMedicine
          ? {
              ...medicine,
              name: editName,
              type: editType,
              price: Number.parseFloat(editPrice) || medicine.price,
              stock: Number.parseInt(editStock) || medicine.stock,
            }
          : medicine,
      ),
    )

    // Reset editing state
    setEditingMedicine(null)
  }

  const cancelEdit = () => {
    setEditingMedicine(null)
  }

  const deleteMedicine = (medicineId: number) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter((medicine) => medicine.id !== medicineId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Medicine Management</h1>
      </div>

      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Medicine Inventory</TabsTrigger>
          <TabsTrigger value="add">Add New Medicine</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medicine Inventory</CardTitle>
              <CardDescription>View and manage all medicines in the system</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search medicines..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No medicines found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMedicines.map((medicine) => (
                      <TableRow key={medicine.id}>
                        {editingMedicine === medicine.id ? (
                          <>
                            <TableCell>
                              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <Select value={editType} onValueChange={setEditType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Tablet">Tablet</SelectItem>
                                  <SelectItem value="Capsule">Capsule</SelectItem>
                                  <SelectItem value="Syrup">Syrup</SelectItem>
                                  <SelectItem value="Injection">Injection</SelectItem>
                                  <SelectItem value="Cream">Cream</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                value={editStock}
                                onChange={(e) => setEditStock(e.target.value)}
                                className="text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button variant="outline" size="sm" onClick={saveEdit}>
                                Save
                              </Button>
                              <Button variant="ghost" size="sm" onClick={cancelEdit}>
                                Cancel
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{medicine.name}</TableCell>
                            <TableCell>{medicine.type}</TableCell>
                            <TableCell className="text-right">${medicine.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{medicine.stock}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => startEditing(medicine.id)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteMedicine(medicine.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Medicine</CardTitle>
              <CardDescription>Add a new medicine to the inventory</CardDescription>
            </CardHeader>
            <form onSubmit={addMedicine}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicineName">Medicine Name</Label>
                  <Input id="medicineName" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicineType">Medicine Type</Label>
                  <Select value={newType} onValueChange={setNewType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tablet">Tablet</SelectItem>
                      <SelectItem value="Capsule">Capsule</SelectItem>
                      <SelectItem value="Syrup">Syrup</SelectItem>
                      <SelectItem value="Injection">Injection</SelectItem>
                      <SelectItem value="Cream">Cream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="medicinePrice">Price</Label>
                    <Input
                      id="medicinePrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicineStock">Initial Stock</Label>
                    <Input
                      id="medicineStock"
                      type="number"
                      min="0"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Add Medicine
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

