"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const CreateBill = () => {
  const [items, setItems] = useState([
    {
      description: "",
      quantity: 0,
      boxQty: 0,
      rate: 0,
      amount: 0,
      originalRate: 0,
    },
  ]);

  const [client, setClient] = useState(null);
  const [itemOptions, setItemOptions] = useState([]);
  const [clients, setClients] = useState([]);
  const [address, setAddress] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [clientname, setClientName] = useState("");
  const [clientaddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [issueDate, setIssueDate] = useState("");
  const [taxRate, setTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch clients, items, and next invoice number
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("/api/client");
        if (res.data?.data) {
          setClients(res.data.data);
          setFilteredClients(res.data.data);
          const add = [...new Set(res.data.data.map((c) => c.address))];
          setAddress(add);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/items");
        if (res.data?.data) setItemOptions(res.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchInvoiceNumber = async () => {
      try {
        const { data } = await axios.get("/api/bill/last");
        const lastNumber = data?.data?.[0]?.invoiceNumber || 0;
        const nextNumber = parseInt(lastNumber) + 1;
        setInvoiceNumber(nextNumber);
      } catch (error) {
        console.log("Error fetching invoice number:", error);
      }
    };

    fetchClients();
    fetchItems();
    fetchInvoiceNumber();
  }, []);

  // ✅ Update client selection
  useEffect(() => {
    const clientData = clients.find((c) => c.clientname === clientname);
    setClient(clientData ? clientData._id : null);
    setClientAddress(clientData ? clientData.address : "");
  }, [clientname, clients]);

  // ✅ Filter clients by address
  useEffect(() => {
    if (!clientaddress) setFilteredClients(clients);
    else setFilteredClients(clients.filter((c) => c.address === clientaddress));
  }, [clientaddress, clients]);

  // ✅ Update item rates & amount when taxRate changes
  useEffect(() => {
    const updatedItems = items.map((item) => {
      const origRate = item.originalRate ?? item.rate;
      const newRate = taxRate > 0 ? origRate / (1 + taxRate / 100) : origRate;
      return {
        ...item,
        rate: parseFloat(newRate.toFixed(2)),
        originalRate: origRate,
        amount: (item.quantity || 0) * parseFloat(newRate.toFixed(2)),
      };
    });
    setItems(updatedItems);
  }, [taxRate]);

  // ✅ Calculate subtotal, tax, total
  useEffect(() => {
    let newSubtotal = 0;
    items.forEach((item) => (newSubtotal += item.amount));
    const calculatedTax = (newSubtotal * taxRate) / 100;
    setSubtotal(newSubtotal);
    setTaxAmount(calculatedTax);
    setTotal(newSubtotal + calculatedTax);
  }, [items, taxRate]);

  // ✅ Handle item input changes
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "rate") updated[index].originalRate = value;

    updated[index].amount =
      (parseFloat(updated[index].quantity) || 0) *
      (parseFloat(updated[index].rate) || 0);

    setItems(updated);
  };

  const handleFocus = (index, field) => {
    const updated = [...items];
    if (updated[index][field] === 0) updated[index][field] = "";
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 0,
        boxQty: 0,
        rate: 0,
        amount: 0,
        originalRate: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  // ✅ Submit invoice
  const handleSubmit = async () => {
    const filteredItems = items.filter(
      (item) => item.description && item.amount > 0
    );

    if (!client || !issueDate) {
      alert("Please select client and issue date");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/bill", {
        client,
        invoiceNumber,
        issueDate,
        items: filteredItems,
        subtotal,
        tax: taxAmount,
        total,
        taxRate,
      });
      console.log(res.data);
      alert("Invoice created successfully!");
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-800 flex flex-col items-center text-white">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 py-4 px-4 md:px-8">
        <a
          href="/dashboard/bill"
          className="inline-flex items-center border active:bg-slate-700 border-white px-4 py-2 rounded-md text-white hover:bg-indigo-500 text-lg md:text-xl"
        >
          ← Back
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">
          Create New Invoice
        </h1>
      </div>

      {/* Main Form */}
      <div className="p-4 md:p-8 w-full max-w-6xl text-black space-y-6">
        {/* Invoice Info */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Invoice Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">
                Invoice Number *
              </label>
              <input
                type="text"
                value={invoiceNumber}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Client Address *
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={clientaddress}
                onChange={(e) => setClientAddress(e.target.value)}
              >
                <option value="">Select a client</option>
                {address.map((addr, idx) => (
                  <option key={idx} value={addr}>
                    {addr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Client Name *</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={clientname}
                onChange={(e) => setClientName(e.target.value)}
              >
                <option value="">Select a client</option>
                {filteredClients.map((c, idx) => (
                  <option key={idx} value={c.clientname}>
                    {c.clientname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium">Issue Date *</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Invoice Items */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-0">
            <h2 className="text-lg md:text-xl font-bold">Invoice Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="px-5 py-2 md:px-6 md:py-3 border rounded bg-blue-600 text-white text-lg md:text-xl hover:bg-blue-700 active:bg-blue-800 transition"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 items-end border-b pb-4"
              >
                {/* Description */}
                <div className="col-span-1 sm:col-span-2 md:col-span-4">
                  <label className="block text-sm font-medium">Description</label>
                  <select
                    value={item.description}
                    onChange={(e) => handleChange(idx, "description", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select item</option>
                    {itemOptions.map((opt) => (
                      <option key={opt._id} value={opt.itemname}>
                        {opt.itemname}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Qty */}
                <div className="col-span-1 sm:col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium">Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onFocus={() => handleFocus(idx, "quantity")}
                    onChange={(e) =>
                      handleChange(idx, "quantity", parseFloat(e.target.value) || 0)
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Box Qty */}
                <div className="col-span-1 sm:col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium">Box Qty</label>
                  <input
                    type="number"
                    min="0"
                    value={item.boxQty || ""}
                    onChange={(e) =>
                      handleChange(idx, "boxQty", parseFloat(e.target.value) || 0)
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Rate */}
                <div className="col-span-1 sm:col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium">Rate</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onFocus={() => handleFocus(idx, "rate")}
                    onChange={(e) =>
                      handleChange(idx, "rate", parseFloat(e.target.value) || 0)
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Amount */}
                <div className="col-span-1 sm:col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium">Amount</label>
                  <div className="py-2 font-semibold text-lg">
                    {item.amount.toFixed(2)}
                  </div>
                </div>

                {/* Remove */}
                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    disabled={items.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow space-y-4">
          <div className="flex justify-between">
            <span>Subtotal (excl. tax):</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div>
            <label className="block text-sm font-medium">Tax Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-between">
            <span>Tax ({taxRate}%):</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow space-y-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } text-white py-2 rounded transition text-lg`}
          >
            {isEditing ? "Update Invoice" : isLoading ? "Saving..." : "Create Invoice"}
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full border border-gray-400 py-2 rounded bg-transparent text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
