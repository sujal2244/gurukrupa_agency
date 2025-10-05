"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [clients, setClients] = useState([]);
    const router =useRouter();
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.get("/api/client");
                setClients(res.data.data);
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        fetchClients();
    }, []);
    return (
        <div>
            {clients?.map((client) => (
                <div className="flex" key={client._id} onClick={()=>router.push(`/dashboard/client/client/${client._id}`)}>
                    <h2>{client.clientname}</h2>
                    <p>{client.address}</p>
                </div>
            ))}
        </div>
    );
};

export default page;
