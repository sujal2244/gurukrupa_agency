"use client"

import { useState } from "react"

export default function Billout() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Invoice Data (Sample)
  const invoiceData = {
    invoiceNumber: "INV-2024-001",
    date: "September 28, 2025",
    dueDate: "October 28, 2025",
    company: {
      name: "Gurukrupa Agency",
      address: "Chinale Galli",
      phone: "9579749504",
      email: "gatade.com",
    },
    customer: {
      name: "Sujal Gatade",
      company: "SG Enterprises",
      address: "Chinale Galli",
      email: "sujal@sgenterprises.com",
    },
    items: [
      { id: 1, description: "Web Development Services", quantity: 40, rate: 125, amount: 5000 },
      { id: 2, description: "UI/UX Design Consultation", quantity: 20, rate: 150, amount: 3000 },
      { id: 3, description: "Project Management", quantity: 15, rate: 100, amount: 1500 },
    ],
    notes: "Thank you for your business! Payment is due within 30 days of invoice date.",
  }

  // Calculations
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
  const taxRate = 0.08
  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount

  // PDF generator
  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const html2pdf = (await import("html2pdf.js")).default || (await import("html2pdf.js"))
      const element = document.getElementById("invoice-content")

      if (!element) {
        console.error("Invoice element not found")
        return
      }

      const options = {
        margin: 0.5,
        filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      await html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error("PDF Error:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen text-black bg-gray-800 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded active:bg-amber-300 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isGeneratingPDF ? "Generating..." : "Download PDF"}
          </button>
        </div>

        {/* Invoice Content */}
        <div id="invoice-content">
          {/* Header */}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">{invoiceData.company.name}</h2>
              <p>{invoiceData.company.address}</p>
              <p>{invoiceData.company.phone}</p>
              <p>{invoiceData.company.email}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Invoice #: {invoiceData.invoiceNumber}</p>
              <p>Date: {invoiceData.date}</p>
              <p>Due Date: {invoiceData.dueDate}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8">
            <h3 className="font-semibold">Bill To:</h3>
            <p>{invoiceData.customer.name}</p>
            <p>{invoiceData.customer.company}</p>
            <p>{invoiceData.customer.address}</p>
            <p>{invoiceData.customer.email}</p>
          </div>

          {/* Items Table */}
          <table className="w-full border border-gray-300 mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">Description</th>
                <th className="border px-4 py-2 text-center">Qty</th>
                <th className="border px-4 py-2 text-right">Rate</th>
                <th className="border px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2 text-center">{item.quantity}</td>
                  <td className="border px-4 py-2 text-right">{item.rate.toFixed(2)}</td>
                  <td className="border px-4 py-2 text-right">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="text-right mb-6">
            <p>
              Subtotal: <span className="font-semibold">{subtotal.toFixed(2)}</span>
            </p>
            <p>
              Tax (8%): <span className="font-semibold">{taxAmount.toFixed(2)}</span>
            </p>
            <p className="text-xl font-bold">Total: {total.toFixed(2)}</p>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold">Notes</h3>
            <p className="text-gray-600">{invoiceData.notes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
