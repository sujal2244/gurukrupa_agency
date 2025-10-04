const billinghistory = () => {
  return (
    <div className="h-screen w-full bg-gray-800 flex justify-evenly items-center flex-col  ">
      <div className="w-full flex  justify-center items-center">
        <a
          href="/home"
          className="inline-flex items-center border active:bg-slate-700  border-white px-3 py-2 rounded-md text-white hover:bg-gray-300ko"
        >
          ← Back
        </a>
        <h1 className="text-5xl mx-18 font-bold">Billing History</h1>
      </div>
       <div class="w-80  max-w-sm min-w-[200px]">
        <div class="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search....."
          />

          <button
            class="rounded-md bg-white py-2 px-4 border border-transparent text-center text-sm text-black font-bold transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-center text-white"></div>
      <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-center text-white"></div>
      <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-center text-white"></div>
      <div className="w-84 h-30 bg-gray-700 bg-opacity-10 rounded-xl flex items-center justify-center text-white"></div>
    </div>
  );
};
export default billinghistory;
