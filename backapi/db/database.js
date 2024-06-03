import mongoose from 'mongoose';
// Here we are connecting with offline database
mongoose.connect('mongodb://127.0.0.1:27017/database');

// After initialize a database let's create a schema
const productSchema = new mongoose.Schema({
    id: {type: Number},
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    sold: {
        type: Boolean
    },
    dateOfSale:{
        type: Date,
        default: Date.now()
    }
});

// Define a model
export const Product = mongoose.model('Product', productSchema);