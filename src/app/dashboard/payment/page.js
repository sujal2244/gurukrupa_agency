"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Payment = () => {
    //pending payment only paid button
    const [bills, setBills] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBills = async () => {
            try {
                const res = await axios.get("/api/bill?paymentStatus=unpaid");
                setBills(res.data.data);
                console.log(res);
            } catch (e) {
                console.log(e);
            }finally {
                setLoading(false);
            }
        };
        fetchBills();
    }, [loading]);
    const handlePaid = async (billId) => {
        try {
            await axios.put(`/api/bill?id=${billId}`);
            // Update the bill status locally after successful payment
            setBills((prevBills) =>
                prevBills.map((bill) =>
                    bill._id === billId ? { ...bill, isPaid: true } : bill
                )
            );
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    };
    const totalAmount = bills?.reduce((sum, bill) => sum + bill.total, 0)||0;
    return (
        <div className="h-screen w-full bg-gray-800 flex flex-col items-center p-4">
            {/* Header */}
            <div className="w-full flex justify-center items-center flex-wrap">
                <a
                    href="/dashboard"
                    className="inline-flex items-center border active:bg-slate-700 border-white px-3 py-2 rounded-md text-white hover:bg-gray-300 mb-2">
                    ← Back
                </a>
                <h1 className="text-3xl md:text-5xl mx-10 font-bold text-white">
                    Payment
                </h1>
            </div>

            {/* Table Wrapper for Responsive View */}
            <div className="overflow-x-auto w-full mt-6">
                <table className="min-w-full border-collapse border border-white text-white text-sm md:text-base">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-white px-4 py-2">
                                Invoice No
                            </th>
                            <th className="border border-white px-4 py-2">
                                Client
                            </th>
                            <th className="border border-white px-4 py-2">
                                Date
                            </th>
                            <th className="border border-white px-4 py-2">
                                Amount
                            </th>
                            <th className="border border-white px-4 py-2">
                                Paid
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {bills ? (
                            bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td className="border border-white px-4 py-2">
                                        {bill.invoiceNumber}
                                    </td>
                                    <td className="border border-white px-4 py-2">
                                        {bill.client.clientname}
                                    </td>
                                    <td className="border border-white px-4 py-2">
                                        {
                                            new Date(bill.issueDate)
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                    </td>
                                    <td className="border border-white px-4 py-2">
                                        ₹{bill.total}
                                    </td>
                                    <td className="border border-white px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-4 py-1 rounded-lg shadow-md text-sm md:text-base"
                                            onClick={() =>
                                                handlePaid(bill._id)
                                            }>
                                            UnPaid
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="border border-white px-4 py-2 text-center">
                                    No paid bills found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {/* Table Footer */}
                    <tfoot>
                        <tr className="bg-gray-700">
                            <td
                                colSpan="4"
                                className="border border-white px-4 py-2 text-right font-bold">
                                Total
                            </td>
                            <td className="border border-white px-4 py-2 font-bold">
                                ₹{totalAmount.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
export default Payment;
