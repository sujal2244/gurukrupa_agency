import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
    clientname: {
        type: String,
        required: true,
    },
    address: { type: String, required: true },
    phone: { type: Number },
    gstNumber: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
export default Client;
