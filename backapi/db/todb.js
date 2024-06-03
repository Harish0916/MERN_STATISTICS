import axios from 'axios';
import { Product } from './database.js';

// Here we are fetching data from the third party API and initialize the database
async function initializeDatabase() {
    try {

        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;
        await Product.deleteMany(); // delete previous data bco'z of every time run
        await Product.insertMany(data); // Insert new again
        console.log('Database initialized');

    } catch (error) {
        console.error(error);
    }
}

export {initializeDatabase}