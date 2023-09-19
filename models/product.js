import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    prices: {
        sm: { type: Number},
        md: { type: Number},
        lg: { type: Number},
    },
    imageUrl: String,
}, {collection: 'products'});

export default mongoose.model('Product', productSchema);
