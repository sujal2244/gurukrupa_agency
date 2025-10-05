"use client";

import InvoicePrint from "@/components/InvoicePrint";
import printDocument from "@/lib/printDocument";
import axios from "axios";
import { useState, useEffect } from "react";

const Billinghistory = () => {
    const [bills, setBills] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch bills whenever month or year changes
    useEffect(() => {
        const fetchBills = async () => {
            try {
                const res = await axios.get(
                    `/api/bill?month=${month}&year=${year}`
                );
                setBills(res.data.data);
                console.log(res.data.data);
            } catch (e) {
                console.log(e);
                setBills([]);
            }
        };
        fetchBills();
    }, [month, year]);

    // Filter bills by search term (invoiceNumber or client name)
    const filteredBills = bills.filter(
        (bill) =>
            bill.invoiceNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            bill.client?.clientname
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );
    const generatePDF = async () => {
        if (!bills) return;

        try {
            const originalElement = document.getElementById("invoice-content");
            printDocument({ month, originalElement });
        } catch (err) {
            console.error("PDF Error:", err);
        }
    };
    return (
        <div className="h-screen w-full bg-gray-800 flex justify-evenly items-center flex-col">
            <div className="w-full flex justify-center items-center mb-4">
                <a
                    href="/dashboard"
                    className="inline-flex items-center border active:bg-slate-700 border-white px-3 py-2 rounded-md text-white hover:bg-gray-300">
                    ← Back
                </a>
                <h1 className="text-5xl mx-18 font-bold text-white">
                    Billing History
                </h1>
            </div>
            <div>
                <div onClick={generatePDF}> print</div>
                <div className="hidden">
                    <div id="invoice-content">
                        {bills.map((cur, idx) => {
                            return <InvoicePrint key={idx} invoiceData={cur} />;
                        })}
                    </div>
                </div>
            </div>
            {/* Search Input */}
            <div className="w-80 max-w-sm min-w-[200px] mb-4">
                <div className="relative flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                        <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by invoice or client..."
                        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                </div>
            </div>

            {/* Month/Year Inputs */}
            <div className="flex space-x-4 mb-4">
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-20 px-2 py-1 rounded"
                />
                <input
                    type="number"
                    min="2000"
                    max="2100"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-24 px-2 py-1 rounded"
                />
            </div>

            {/* Bills List */}
            <div className="flex flex-wrap justify-center gap-4 w-full px-4">
                {filteredBills.length > 0 ? (
                    filteredBills.map((bill, idx) => (
                        <div
                            key={idx}
                            className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-center text-white p-4">
                            <div>
                                <div>Invoice #: {bill.invoiceNumber}</div>
                                <div>Client: {bill.client?.clientname}</div>
                                <div>Amount: {bill.total?.toFixed(2)}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white">No bills found</div>
                )}
            </div>
        </div>
    );
};

export default Billinghistory;
