"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
const page = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [bills, setBills] = useState([]);
    const router=useRouter();
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const res = await axios.get(`/api/client?id=${id}`);
                console.log(res.data);
                setClient(res.data.data);
                fetchBills(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
        const fetchBills = async (data) => {
            console.log(data);
            try {
                const res = await axios.get(
                    `/api/bill?client=${data._id}`
                );
                console.log(res.data);
                setBills(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchClient();
    }, []);
    return (
        <div>
            <div>{client?.clientname}</div>
            <div>{client?.address}</div>
            {bills ? (
                bills.map((bill) => (
                    <div key={bill._id} className="flex" onClick={()=>router.push(`/dashboard/bill/${bill._id}`)}>
                        <div>{bill.invoiceNumber}</div>
                        <div>{new Date(bill.issueDate).toLocaleDateString()}</div>
                        <div>{bill.total}</div>
                    </div>
                ))
            ) : (
                <div>No bills</div>
            )}
        </div>
    );
};

export default page;
