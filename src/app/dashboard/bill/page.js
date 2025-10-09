"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Bill = () => {
  const router = useRouter();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get("/api/bill");
        setBills(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-800 text-white flex flex-col items-center p-4">
      {/* Top Section: Back + Create Bill */}
      <div className="w-full flex justify-between items-center mb-4">
        {/* Back Button */}
        <a
          href="/dashboard"
          className="inline-flex items-center border border-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          ← Back
        </a>

        {/* Create Bill Button */}
        <button
          onClick={() => router.push("/dashboard/createbill")}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl text-lg transition"
        >
          + Create Bill
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full md:w-2/3 flex items-center mb-6">
        <div className="relative flex items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-3 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="w-full bg-gray-700 placeholder:text-slate-400 text-sm border border-gray-600 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:border-gray-400 transition"
            placeholder="Search Invoice..."
          />
        </div>
        <button
          className="ml-2 bg-white hover:bg-gray-200 active:bg-blue-500 text-black hover:text-black active:text-white font-semibold py-2 px-6 rounded-md transition"
          type="button"
        >
          Search
        </button>
      </div>

      {/* Bill List Section */}
      <div className="w-full flex flex-col items-center overflow-y-auto">
        {bills && bills.length > 0 ? (
          bills.map((bill) => (
            <div
              key={bill._id}
              className="w-full md:w-3/4 bg-gray-700 rounded-lg shadow-md p-5 mb-4 cursor-pointer hover:bg-gray-600 transition"
              onClick={() => router.push(`/dashboard/billout?id=${bill._id}`)}
            >
              <h2 className="text-xl font-bold mb-2">
                Invoice #{bill.invoiceNumber}
              </h2>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold">Client:</span>{" "}
                {bill?.client?.clientname}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(bill.issueDate).toLocaleDateString()}
              </p>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold">Total Amount:</span> ₹
                {bill.total}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/billout?id=${bill._id}`);
                }}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-white text-2xl mt-10">No Bills Created</h1>
        )}
      </div>
    </div>
  );
};

export default Bill;
