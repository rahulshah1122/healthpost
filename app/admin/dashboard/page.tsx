"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Printer, Plus, Calendar, Clock, User, UserCheck, Ticket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for doctors
const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Medicine" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrics" },
  { id: 3, name: "Dr. Emily Rodriguez", specialty: "Cardiology" },
]

// Mock data for recent tickets
const initialTickets = [
  {
    id: "T001",
    patientName: "John Smith",
    doctor: "Dr. Sarah Johnson",
    date: "2023-05-15",
    time: "09:30 AM",
    queueNumber: 1,
  },
  {
    id: "T002",
    patientName: "Maria Garcia",
    doctor: "Dr. Michael Chen",
    date: "2023-05-15",
    time: "10:00 AM",
    queueNumber: 2,
  },
]

export default function TicketGeneration() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState(initialTickets)
  const [patientName, setPatientName] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")

  const generateTicket = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a new ticket ID
    const newTicketId = `T${String(tickets.length + 1).padStart(3, "0")}`

    // Find the doctor name from the selected ID
    const doctor = doctors.find((d) => d.id.toString() === selectedDoctor)?.name || "Unassigned"

    // Create new ticket
    const newTicket = {
      id: newTicketId,
      patientName,
      doctor,
      date: appointmentDate,
      time: appointmentTime,
      queueNumber: tickets.length + 1,
    }

    // Add to tickets list
    setTickets([...tickets, newTicket])

    // Show success toast
    toast({
      title: "Ticket Generated",
      description: `Ticket #${newTicketId} for ${patientName} has been created.`,
    })

    // Reset form
    setPatientName("")
    setSelectedDoctor("")
    setAppointmentDate("")
    setAppointmentTime("")
  }

  const printTicket = (ticketId: string) => {
    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) return

    // In a real app, this would open a print dialog with formatted ticket
    alert(
      `Printing Ticket:\n\nTicket #: ${ticket.id}\nPatient: ${ticket.patientName}\nDoctor: ${ticket.doctor}\nDate: ${ticket.date}\nTime: ${ticket.time}\nQueue #: ${ticket.queueNumber}`,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ticket Generation</h1>
          <p className="text-muted-foreground">Create and manage patient consultation tickets</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-2 bg-blue-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
              Create New Ticket
            </CardTitle>
            <CardDescription>Generate a new ticket for patient consultation</CardDescription>
          </CardHeader>
          <form onSubmit={generateTicket}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Patient Name
                </Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="border-muted"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  Assign Doctor (Optional)
                </Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="border-muted">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="border-muted"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="border-muted"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20">
              <Button type="submit" className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Generate Ticket
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-2 bg-blue-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-blue-100">
                <Ticket className="h-4 w-4 text-blue-600" />
              </div>
              Recent Tickets
            </CardTitle>
            <CardDescription>View and manage recently generated tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead className="hidden md:table-cell">Doctor</TableHead>
                    <TableHead className="hidden md:table-cell">Date/Time</TableHead>
                    <TableHead>Queue #</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {ticket.id}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.patientName}</TableCell>
                      <TableCell className="hidden md:table-cell">{ticket.doctor}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{ticket.date}</span>
                          <Clock className="h-3 w-3 ml-1 text-muted-foreground" />
                          <span className="text-sm">{ticket.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{ticket.queueNumber}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => printTicket(ticket.id)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

