"use client";
import Image from "next/image";
import logo from "/public/Gurukrupa logo.png";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      if (res.data.success) {
        router.push("/dashboard");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Error in registration");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white h-[100vh] justify-center flex flex-col gap-4 items-center ">
      <div className="sm:w-[20vw] w-[83vw] mt-4 flex justify-center items-center ">
        <Image src={logo} className="w-[47vw] h-[7vh] m-3" alt="logo"></Image>
      </div>

      <div className="h-[70vh] w-[83vw] bg-white rounded-2xl shadow-2xl justify-center flex items-center flex-col gap-8">
        <h1 className="font-bold text-[30px]  text-blue-500">SIGN UP</h1>
        <input
          type="text"
          placeholder="Enter User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <button
          onClick={handleSubmit}
          className=" border-1 border-black text-lg font-semibold bg-blue-300 h-[6vh] w-[40vw] flex justify-center items-center rounded-xl p-3  hover:bg-white"
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default Signup;
