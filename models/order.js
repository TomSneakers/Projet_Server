import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    id: Number,
    ownerId: String,
    date: Date,
    clientDetails: Object,
    total: Number,
    items: [
        {
            product_id: String,
            name: String,
            price: Number,
            quantity: Number,
            size: String,
        }
    ]

}, { collection: 'orders' });

export default mongoose.model('Order', orderSchema);
