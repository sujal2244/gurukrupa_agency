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

  // Fetch bills when month or year changes
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(`/api/bill?month=${month}&year=${year}`);
        setBills(res.data.data);
      } catch (e) {
        console.log(e);
        setBills([]);
      }
    };
    fetchBills();
  }, [month, year]);

  const filteredBills = bills.filter((bill) => {
    const term = searchTerm.toLowerCase();
    return (
      bill.invoiceNumber.toString().includes(term) ||
      bill.client?.clientname.toLowerCase().includes(term)
    );
  });

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
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center p-4 sm:p-6">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center mb-6">
        <a
          href="/dashboard"
          className="inline-flex items-center border border-white px-3 py-2 rounded-md text-white hover:bg-gray-700 active:bg-slate-700 transition-all duration-200"
        >
          ← Back
        </a>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          Billing History
        </h1>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-md mb-6">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-3 left-3 text-slate-600"
          >
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
            className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Month / Year / Print Section */}
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-4 shadow-md mb-8">
        <h2 className="text-lg font-semibold text-white mb-3 text-center">
          Select month and year
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
          {/* Month Input */}
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-300 mb-1">Month</label>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-24 px-3 py-2 text-center text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Year Input */}
          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-300 mb-1">Year</label>
            <input
              type="number"
              min="2000"
              max="2100"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-28 px-3 py-2 text-center text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Print Button */}
          <button
            onClick={generatePDF}
            className="self-end bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-5 py-2 rounded-md shadow-md transition-all duration-200"
          >
            Print
          </button>
        </div>
      </div>

      {/* Hidden Print Section */}
      <div className="hidden">
        <div id="invoice-content">
          {bills.map((cur, idx) => (
            <InvoicePrint key={idx} invoiceData={cur} />
          ))}
        </div>
      </div>

      {/* Bills List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill, idx) => (
            <div
              key={idx}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              <div className="font-semibold text-lg mb-1 truncate">
                Invoice #: {bill.invoiceNumber}
              </div>
              <div className="truncate text-gray-300">
                Client: {bill.client?.clientname}
              </div>
              <div className="text-blue-400 font-medium mt-1">
                ₹{bill.total?.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-300">
            No bills found
          </div>
        )}
      </div>
    </div>
  );
};

export default Billinghistory;
