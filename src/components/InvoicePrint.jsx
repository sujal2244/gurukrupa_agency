import React from "react";

const InvoicePrint = ({ invoiceData }) => {
    return (
        <div
            style={{
                // width: "210mm", // A4 width
                // minHeight: "245mm", // A4 height
                // padding: "20mm",
                // margin: "auto",
                backgroundColor: "white",

                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
                color: "#000",
                pageBreakAfter: "always",
            }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "32px",
                }}>
                <div>
                    <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Gurukrupa Agency
                    </h2>
                    <p>Chinale Galli</p>
                    <p>1234567890</p>
                    <p>fsgfs@hghg.h</p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        Invoice #: {invoiceData?.invoiceNumber}
                    </p>
                    <p>
                        Date:{" "}
                        {invoiceData?.issueDate
                            ? new Date(
                                  invoiceData.issueDate
                              ).toLocaleDateString()
                            : "-"}
                    </p>
                    <p>Due Date: {invoiceData?.dueDate || "-"}</p>
                </div>
            </div>

            {/* Customer Info */}
            <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontWeight: "600" }}>Bill To:</h3>
                <p>{invoiceData?.client?.clientname}</p>
                <p>{invoiceData?.client?.address}</p>
            </div>

            {/* Items Table */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "24px",
                }}>
                <thead style={{ backgroundColor: "#e5e7eb" }}>
                    <tr>
                        <th
                            style={{
                                border: "1px solid #d1d5db",
                                padding: "8px",
                                textAlign: "left",
                            }}>
                            Description
                        </th>
                        <th
                            style={{
                                border: "1px solid #d1d5db",
                                padding: "8px",
                                textAlign: "center",
                            }}>
                            Qty
                        </th>
                        <th
                            style={{
                                border: "1px solid #d1d5db",
                                padding: "8px",
                                textAlign: "right",
                            }}>
                            Rate
                        </th>
                        <th
                            style={{
                                border: "1px solid #d1d5db",
                                padding: "8px",
                                textAlign: "right",
                            }}>
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData?.items?.map((item) => (
                        <tr key={item.id}>
                            <td
                                style={{
                                    border: "1px solid #d1d5db",
                                    padding: "8px",
                                }}>
                                {item.description}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #d1d5db",
                                    padding: "8px",
                                    textAlign: "center",
                                }}>
                                {item.quantity}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #d1d5db",
                                    padding: "8px",
                                    textAlign: "right",
                                }}>
                                {item.rate.toFixed(2)}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #d1d5db",
                                    padding: "8px",
                                    textAlign: "right",
                                }}>
                                {item.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
                <p>
                    Subtotal:{" "}
                    <span style={{ fontWeight: "600" }}>
                        {invoiceData?.subtotal?.toFixed(2)}
                    </span>
                </p>
                <p>
                    Tax (8%):{" "}
                    <span style={{ fontWeight: "600" }}>
                        {invoiceData?.tax?.toFixed(2)}
                    </span>
                </p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total: {invoiceData?.total?.toFixed(2)}
                </p>
            </div>

            {/* Notes */}
            <div>
                <h3 style={{ fontWeight: "600" }}>
                    Notes: Thank you for your business! Payment is due within 30
                    days of invoice date.
                </h3>
            </div>
        </div>
    );
};

export default InvoicePrint;
