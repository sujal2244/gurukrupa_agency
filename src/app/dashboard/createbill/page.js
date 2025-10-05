"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const CreateBill = () => {
    // Items state
    const [items, setItems] = useState([
        { description: "", quantity: 1, rate: 0, amount: 0 },
    ]);
    const [client, setClient] = useState(null);
    const [itemOptions, setItemOptions] = useState([]);
    // Client state
    const [clients, setClients] = useState([]);
    const [address, setAddress] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [clientname, setClientName] = useState("");
    const [clientaddress, setClientAddress] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [isPaid, setIsPaid] = useState(false);

    // Summary state
    const [subtotal, setSubtotal] = useState(0);
    const [taxRate, setTaxRate] = useState(10); // default 10%
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Calculate subtotal whenever items change
    useEffect(() => {
        const sum = items.reduce((acc, item) => acc + item.amount, 0);
        setSubtotal(sum);
    }, [items]);

    // Handle change in item fields
    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        updated[index].amount =
            (parseFloat(updated[index].quantity) || 0) *
            (parseFloat(updated[index].rate) || 0);
        setItems(updated);
    };

    // Add new item
    const addItem = () => {
        setItems([
            ...items,
            { description: "", quantity: 1, rate: 0, amount: 0 },
        ]);
    };

    // Remove item
    const removeItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    // Summary calculations
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    // Submit handler
    const handleSubmit = async () => {
        const filterItems = items.filter(
            (cur) => cur.description !== "" && cur.amount !== 0
        );
        try {
            const res = await axios.post("/api/bill", {
                client,
                invoiceNumber,
                issueDate,
                items: filterItems,
                subtotal,
                tax: taxAmount,
                total,

                taxRate,
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        // Fetch clients from API
        const fetchClients = async () => {
            try {
                const res = await axios.get("/api/client");
                setClients(res.data.data);
                setFilteredClients(res.data.data);
                console.log(res.data.data);
                const add = [
                    ...new Set(res.data.data.map((client) => client.address)),
                ];
                setAddress(add);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        const fetchItems = async () => {
            try {
                const res = await axios.get("/api/items");
                console.log(res.data.data);
                setItemOptions(res.data.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
        fetchClients();
    }, []);
    useEffect(() => {
        if (!clientaddress) {
            setFilteredClients(clients); // show all if no address selected
        } else {
            const filtered = clients.filter(
                (client) => client.address === clientaddress
            );
            setFilteredClients(filtered);
        }
    }, [clientaddress, clients]);
    useEffect(() => {
        if (filteredClients.length === 1) {
            setClientName(filteredClients[0].clientname);
        }
    }, [filteredClients]);
    useEffect(() => {
        const client = clients.find((c) => c.clientname === clientname);
        setClient(client ? client._id : null);
        setClientAddress(client ? client.address : "");
    }, [clientname, clients]);
    return (
        <div className="w-full bg-gray-800 flex text-white items-center flex-col">
            {/* Header */}
            <div className="w-full flex items-center justify-center">
                <a
                    href="/bill"
                    className="inline-flex items-center border active:bg-slate-700 border-white px-3 py-2 rounded-md text-white hover:bg-indigo-500">
                    ← Back
                </a>
                <h1 className="text-3xl text-white font-bold p-8">
                    Create New Invoice
                </h1>
            </div>

            <div className="p-8 w-[90%] max-w-5xl text-black space-y-6">
                {/* Invoice Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4">
                        Invoice Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium">
                                Invoice Number *
                            </label>
                            <input
                                type="text"
                                value={invoiceNumber}
                                required
                                onChange={(e) =>
                                    setInvoiceNumber(e.target.value)
                                }
                                placeholder="Enter invoice number"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Client address *
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={clientaddress}
                                onChange={(e) =>
                                    setClientAddress(e.target.value)
                                }>
                                <option value="">Select a client</option>
                                {address?.map((addr, index) => (
                                    <option key={index} value={addr}>
                                        {addr}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            {" "}
                            <label className="block text-sm font-medium">
                                Client name *
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={clientname}
                                onChange={(e) => setClientName(e.target.value)}>
                                <option value="">Select a client</option>
                                {filteredClients?.map((client, index) => (
                                    <option
                                        key={index}
                                        value={client.clientname}>
                                        {client.clientname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Issue Date *
                        </label>
                        <input
                            type="date"
                            value={issueDate}
                            required
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Invoice Items</h2>
                        <button
                            type="button"
                            onClick={addItem}
                            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200">
                            + Add Item
                        </button>
                    </div>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-4 items-end border-b pb-4">
                                {/* Description */}
                                <div className="col-span-12 md:col-span-5">
                                    <label className="block text-sm font-medium">
                                        Description
                                    </label>
                                    <select
                                        value={item.description}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2">
                                        <option value="">Select item</option>
                                        {itemOptions.map((option) => (
                                            <option
                                                key={option._id}
                                                value={option.itemname}>
                                                {option.itemname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium">
                                        Qty
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "quantity",
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                {/* Rate */}
                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-sm font-medium">
                                        Rate
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.rate}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "rate",
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                {/* Amount */}
                                <div className="col-span-3 md:col-span-2">
                                    <label className="block text-sm font-medium">
                                        Amount
                                    </label>
                                    <div className="py-2 font-semibold text-lg">
                                        {item.amount.toFixed(2)}
                                    </div>
                                </div>
                                {/* Remove */}
                                <div className="col-span-1">
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        disabled={items.length === 1}
                                        className="text-red-600 hover:text-red-800 disabled:opacity-50">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invoice Summary */}
                <div className="bg-white p-6 rounded-lg shadow space-y-6">
                    <h2 className="text-lg font-bold">Invoice Summary</h2>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">
                            {subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Tax Rate (%)
                        </label>
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
                        <span className="text-gray-600">Tax ({taxRate}%):</span>
                        <span className="font-semibold">
                            {taxAmount.toFixed(2)}
                        </span>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-white p-6 rounded-lg shadow space-y-3">
                    <button
                        onClick={handleSubmit}
                        // disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                        {isLoading
                            ? isEditing
                                ? "Updating..."
                                : "Creating..."
                            : isEditing
                            ? "Update Invoice"
                            : "Create Invoice"}
                    </button>
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/dashboard")}
                        className="w-full border border-gray-400 py-2 rounded bg-transparent">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBill;
