const Payment = () => {
  return (
    <div className="h-screen w-full bg-gray-800 flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full flex justify-center items-center flex-wrap">
        <a
          href="/home"
          className="inline-flex items-center border active:bg-slate-700 border-white px-3 py-2 rounded-md text-white hover:bg-gray-300 mb-2"
        >
          ← Back
        </a>
        <h1 className="text-3xl md:text-5xl mx-10 font-bold text-white">
          Payment
        </h1>
      </div>

      {/* Table Wrapper for Responsive View */}
      <div className="overflow-x-auto w-full mt-6">
        <table className="min-w-full border-collapse border border-white text-white text-sm md:text-base">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-white px-4 py-2">Invoice No</th>
              <th className="border border-white px-4 py-2">Client</th>
              <th className="border border-white px-4 py-2">Date</th>
              <th className="border border-white px-4 py-2">Amount</th>
              <th className="border border-white px-4 py-2">Paid</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr>
              <td className="border border-white px-4 py-2">INV-001</td>
              <td className="border border-white px-4 py-2">John Doe</td>
              <td className="border border-white px-4 py-2">2025-09-28</td>
              <td className="border border-white px-4 py-2">₹5000</td>
              <td className="border border-white px-4 py-2">
                <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-4 py-1 rounded-lg shadow-md text-sm md:text-base">
                  Paid
                </button>
              </td>
            </tr>

            {/* Line between rows */}
            <tr className="border-t border-gray-500"></tr>

            <tr>
              <td className="border border-white px-4 py-2">INV-002</td>
              <td className="border border-white px-4 py-2">Jane Smith</td>
              <td className="border border-white px-4 py-2">2025-09-29</td>
              <td className="border border-white px-4 py-2">₹7500</td>
              <td className="border border-white px-4 py-2 text-center">
               <button className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-4 py-1 rounded-lg shadow-md text-sm md:text-base">
                  Paid
                </button>
              </td>
            </tr>
          </tbody>

          {/* Table Footer */}
          <tfoot>
            <tr className="bg-gray-700">
              <td
                colSpan="4"
                className="border border-white px-4 py-2 text-right font-bold"
              >
                Total
              </td>
              <td className="border border-white px-4 py-2 font-bold">₹12,500</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default Payment;
