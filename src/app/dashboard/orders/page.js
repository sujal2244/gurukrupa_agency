"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
    // todays orders
    const [bills, setBills] = useState([]);
    useEffect(() => {
        // fetch orders from api
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/api/bill?today=true");
                setBills(res.data.data);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrders();
    }, []);
    return (
        <div className="h-screen w-full bg-gray-800 flex justify-evenly items-center flex-col">
            {/* Header */}
            <div className="w-full flex justify-center items-center">
                <a
                    href="/dashboard"
                    className="inline-flex items-center border active:bg-slate-700 border-white px-3 py-2 rounded-md text-white hover:bg-gray-300">
                    ← Back
                </a>
                <h1 className="text-5xl mx-18 font-bold text-white">Orders</h1>
            </div>

            {/* Search */}
            <div className="w-80 max-w-sm min-w-[200px]">
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
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Search Orders....."
                    />

                    <button
                        className="rounded-md bg-white py-2 px-4 ml-2 text-sm text-black font-bold transition-all shadow-md hover:bg-slate-700 hover:text-white"
                        type="button">
                        Search
                    </button>
                </div>
            </div>
            {bills.length === 0 ? (
                <h2 className="text-white text-2xl">No orders for today</h2>
            ) : (
                bills.map((bill) => (
                    <div
                        key={bill._id}
                        className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-between px-4 text-white">
                        <span>Order #{bill.invoiceNumber}</span>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                className="h-6 w-6 fill-red-600 hover:fill-red-800">
                                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                            </svg>
                        </button>
                    </div>
                ))
            )}
            {/* Orders list */}
            <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-between px-4 text-white">
                <span>Order #1</span>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="h-6 w-6 fill-red-600 hover:fill-red-800">
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                    </svg>
                </button>
            </div>

            {/* Empty cards */}
            <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-between px-4 text-white">
                <span>Order #2</span>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="h-6 w-6 fill-red-600 hover:fill-red-800">
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                    </svg>
                </button>
            </div>

            <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-between px-4 text-white">
                <span>Order #3</span>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="h-6 w-6 fill-red-600 hover:fill-red-800">
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Orders;
