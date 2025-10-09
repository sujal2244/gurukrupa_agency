"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ClientDetails() {
    const [showForm, setShowForm] = useState(false);
    const [client, setClient] = useState({
        clientname: "",
        address: "",
        gstNumber: "",
        phone: "",
    });
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data } = await axios.get("/api/client");
                if (data.success) {
                    setClients(data.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, [loading]);
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !client.clientname ||
            !client.address ||
            !client.gstNumber ||
            !client.phone
        ) {
            alert("Please fill all fields");
            return;
        }
        try {
            const res = await axios.post("/api/client", {
                clientname: client.clientname,
                address: client.address,
                gstNumber: client.gstNumber,
                phone: client.phone,
            });
            if (res.data.success) {
                alert("Client added successfully");
            } else {
                alert(res.data.message);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(true);
        }
        setClient({ clientname: "", address: "", gstNumber: "", phone: "" });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-800 text-black p-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
                {/* Header with Add Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-700">
                        Client Details
                    </h2>

                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                            Add Client Details
                        </button>
                    )}
                </div>

                {/* Add Client Form */}
                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 border border-gray-200 rounded-xl p-5 mb-6 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Client Name
                                </label>
                                <input
                                    type="text"
                                    name="clientname"
                                    value={client.clientname}
                                    onChange={handleChange}
                                    placeholder="Enter client name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* GST Number */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    GST Number
                                </label>
                                <input
                                    type="text"
                                    name="gstNumber"
                                    value={client.gstNumber}
                                    onChange={handleChange}
                                    placeholder="Enter GST number"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={client.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={client.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                rows="2"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                                Save Client
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Clients Table */}
                {clients.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Sr No
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Name
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Address
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        GST Number
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                        Phone Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((c, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition duration-150">
                                        <td className="border border-gray-300 px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {c.clientname}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {c.address}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {c.gstNumber}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {c.phone}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        No clients added yet.
                    </p>
                )}
            </div>
        </div>
    );
}
