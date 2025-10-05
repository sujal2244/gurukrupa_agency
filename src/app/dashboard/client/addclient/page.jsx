"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
    const [clientname, setClientName] = useState("");
    const [address, setAddress] = useState("");
    const handleSubmit = async () => {
        try {
            const res = await axios.post("/api/client", {
                clientname,
                address,
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="name"
                value={clientname}
                onChange={(e) => setClientName(e.target.value)}
            />
            <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Client</button>
        </div>
    );
};

export default page;
