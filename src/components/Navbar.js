"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "/public/Gurukrupa logo.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router=useRouter();
    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/auth/logout");
            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <nav className="w-full bg-white sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link
                href={"/dashboard"}
                className="sm:w-[20vw] w-[70vw] flex items-center">
                <Image src={logo} alt="Logo" className="w-[47vw] h-[5vh] m-3" />
            </Link>

            {/* Profile Section */}
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center border border-gray-800 px-5 py-4 rounded-lg hover:bg-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="w-8  fill-gray-800">
                        <path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z" />
                    </svg>
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                        <div className="px-4 py-2 border-b">👤 John Doe</div>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                            onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
