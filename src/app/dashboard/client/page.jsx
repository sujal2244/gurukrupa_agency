import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div>
            {" "}
            <Link href={"/dashboard/client/client"}>all client</Link>
            <Link href={"/dashboard/client/addclient"}>add client</Link>
        </div>
    );
};

export default page;
