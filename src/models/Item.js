import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
    itemname: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);
export default Item;
