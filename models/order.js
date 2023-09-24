import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    date: Date,
    ownerId: String,
    clientDetails: Object,
    total: Number,
    items: [
        {
            name: String,
            price: Number,
            imageUrl: String,
            size: String,
        }
    ]

}, { collection: 'orders' });

export default mongoose.model('Order', orderSchema);
