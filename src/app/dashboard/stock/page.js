"use client";
import { useState } from "react";

const Stock = () => {
    const [items, setItems] = useState([
        { id: 1, name: "Sugar", quantity: 50 },
        { id: 2, name: "Rice", quantity: 100 },
        { id: 3, name: "Wheat", quantity: 75 },
    ]);

    const [form, setForm] = useState({ name: "", quantity: "" });
    const [stockInput, setStockInput] = useState({});
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([...items, { ...form, id: Date.now() }]);
        setForm({ name: "", quantity: "" });
        setShowForm(false);
    };

    const increaseStock = (id) => {
        const value = Number(stockInput[id] || 0);
        if (value > 0) {
            setItems(
                items.map((item) =>
                    item.id === id
                        ? { ...item, quantity: Number(item.quantity) + value }
                        : item
                )
            );
            setStockInput({ ...stockInput, [id]: "" });
        }
    };

    const decreaseStock = (id) => {
        const value = Number(stockInput[id] || 0);
        if (value > 0) {
            setItems(
                items.map((item) =>
                    item.id === id && item.quantity >= value
                        ? { ...item, quantity: Number(item.quantity) - value }
                        : item
                )
            );
            setStockInput({ ...stockInput, [id]: "" });
        }
    };

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const totalStock = items.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
    );

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-800 p-4 sm:p-8 text-white">
            {/* Top Back Button */}
            <div className="flex items-center mb-4">
                <a
                    href="/home"
                    className="inline-flex items-center border active:bg-slate-700  border-white px-3 py-2 rounded-md text-white hover:bg-gray-300ko">
                    ← Back
                </a>
                <h1 className="text-3xl sm:text-4xl font-bold text-center flex-1">
                    Stock
                </h1>
            </div>
            {/* Total Stock + Add New Item Button */}
            <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
                <div className="bg-green-700 text-green-100 px-4 py-2 rounded-lg text-lg sm:text-xl font-semibold">
                    Total Stock: {totalStock}
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {showForm ? "Cancel" : "Add New Item"}
                </button>
            </div>

            {/* Add Item Form */}
            {showForm && (
                <div className="max-w-lg mx-auto bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Item Name"
                            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-600 text-white placeholder-gray-300"
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="Initial Quantity"
                            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-600 text-white placeholder-gray-300"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Add Item
                        </button>
                    </form>
                </div>
            )}

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search stock..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-600 text-white placeholder-gray-300"
                />
            </div>

            {/* Items Table */}
            <div className="max-w-5xl mx-auto bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Stock Items</h2>
                <table className="min-w-full border border-gray-600">
                    <thead className="bg-gray-600">
                        <tr>
                            <th className="border px-4 py-2 text-left">
                                Item Name
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Quantity
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Manage Stock
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Remove Item
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr
                                    key={item.id}
                                    className="text-center sm:text-center">
                                    <td className="border px-2 sm:px-4 py-2 text-left">
                                        {item.name}
                                    </td>
                                    <td className="border px-2 sm:px-4 py-2">
                                        {item.quantity}
                                    </td>
                                    <td className="border px-2 sm:px-4 py-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <input
                                                type="number"
                                                placeholder="Qty"
                                                value={
                                                    stockInput[item.id] || ""
                                                }
                                                onChange={(e) =>
                                                    setStockInput({
                                                        ...stockInput,
                                                        [item.id]:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-20 border border-gray-600 rounded px-2 py-1 bg-gray-600 text-white placeholder-gray-300 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    increaseStock(item.id)
                                                }
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                                +
                                            </button>
                                            <button
                                                onClick={() =>
                                                    decreaseStock(item.id)
                                                }
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                -
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border px-2 sm:px-4 py-2">
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-4 text-gray-400">
                                    No matching items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stock;
