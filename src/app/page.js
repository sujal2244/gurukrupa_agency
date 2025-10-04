import Image from "next/image";
import logo from "/public/Gurukrupa logo.png";

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col h-[90vh] gap-4 bg-white">
      <div className="sm:w-[20vw] w-[83vw]  flex justify-center items-center ">
        <Image src={logo} className="w-[47vw] h-[7vh] m-3"></Image>
      </div>
      <div className="bg-white text-black  flex  h-[65vh] w-[83vw] rounded-2xl shadow-2xl flex-col justify-center gap-5 items-center">
        <h3 className="font-bold text-blue-500 text-3xl">LOGIN</h3>
        <input
          className="border-1  border-black h-[vh] w-[55vw] flex justify-center rounded-xl p-3 "
          type="number"
          placeholder="Enter phone number"
        />
        <input
          className="border-1  border-black h-[7vh] w-[55vw] flex justify-center items-center rounded-xl p-3 "
          type="password"
          placeholder="Enter password"
        />
        <button className="border-1  border-black text-lg font-semibold bg-blue-300 h-[6vh] w-[40vw] flex justify-center items-center rounded-xl p-3  hover:bg-white">
          OK
        </button>
        <p className="text-gray-500">for new account?{" "}
        <a href="/signup" className="text-blue-500 text-xl">
          Signup
        </a></p>
      </div>
    </div>
  );
}
