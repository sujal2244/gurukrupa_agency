import Image from "next/image";
import logo from "/public/Gurukrupa logo.png";

const signup = () => {
  return (
    <div className="bg-white h-[100vh] justify-center flex flex-col gap-4 items-center ">
      <div className="sm:w-[20vw] w-[83vw] mt-4 flex justify-center items-center ">
        <Image src={logo} className="w-[47vw] h-[7vh] m-3"></Image>
      </div>

      <div className="h-[70vh] w-[83vw] bg-white rounded-2xl shadow-2xl justify-center flex items-center flex-col gap-8">
        <h1 className="font-bold text-[30px]  text-blue-500">
          SIGN UP
        </h1>
        <input
          type="text"
          placeholder="Enter User Name"
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="number"
          placeholder="Enter Phone Number"
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="number"
          placeholder="Enter Password"
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <input
          type="number"
          placeholder="Confirm Password"
          className="border-1 text-gray-500  h-[7vh] w-[55vw] flex justify-center rounded-xl p-3 "
        />
        <button className=" border-1 border-black text-lg font-semibold bg-blue-300 h-[6vh] w-[40vw] flex justify-center items-center rounded-xl p-3  hover:bg-white">
          OK
        </button>
      </div>
    </div>
  );
};
export default signup;
