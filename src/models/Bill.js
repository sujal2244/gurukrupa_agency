import mongoose, { Schema } from "mongoose";

const billSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    issueDate: { type: Date, required: true },
    items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            rate: { type: Number, required: true },
            amount: { type: Number, required: true },
        },
    ],
    isPaid: { type: Boolean, default: false },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    taxRate: { type: Number, required: true },
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Bill = mongoose.models.Bill || mongoose.model("Bill", billSchema);
export default Bill;
