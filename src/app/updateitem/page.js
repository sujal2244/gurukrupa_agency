const updateitem = () => {
  return (
    <div className="h-screen w-full bg-gray-800 flex justify-evenly items-center flex-col  ">
      {" "}
      <div className="w-full flex  justify-center items-center">
        <a
          href="/home"
          className="inline-flex items-center border active:bg-slate-700  border-white px-3 py-2 rounded-md text-white hover:bg-gray-300ko"
        >
          ← Back
        </a>
        <h1 className="text-5xl mx-18 font-bold">Update Items</h1>
      </div>
  <table border="1" cellpadding="10" cellspacing="0">
  {/* <!-- Table Header --> */}
  <thead>
    <tr>
      <th>Invoice No</th>
      <th>Client</th>
      <th>Date</th>
      <th>Amount</th>
    </tr>
  </thead>

  {/* <!-- Table Body --> */}
  <tbody>
    <tr>
      <td>INV-001</td>
      <td>John Doe</td>
      <td>2025-09-28</td>
      <td>₹5000</td>
    </tr>
    <tr>
      <td>INV-002</td>
      <td>Jane Smith</td>
      <td>2025-09-29</td>
      <td>₹7500</td>
    </tr>
  </tbody>

  {/* <!-- Table Footer --> */}
  <tfoot>
    <tr>
      <td colspan="3"><b>Total</b></td>
      <td><b>₹12,500</b></td>
    </tr>
  </tfoot>
</table>

    </div>
  );
};
export default updateitem;
