import { Product } from "../db/database.js";
import axios from 'axios';
import MongoClient from 'mongodb';

export const getProducts = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search } = req.query;
        const query = search
          ? {
              $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { price: { $regex: search, $options: "i" } },
              ],
            }
          : {};
    
        // Fetch transactions with pagination
        const product = await Product.find(query)
          .skip((page - 1) * perPage)
          .limit(perPage);
        // console.log(product)
        res.json(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const getStatistics = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const month = req.params.month.toLowerCase();
        const products = response.data;

        // We are filtering products based on selected month if you search as http://localhost:5000/api/statistics/june
        const filteredProducts = products.filter(product => {
            const date = new Date(product.dateOfSale);
            return date.toLocaleString('default', { month: 'long' }).toLowerCase() === month;
        });

        // After filtering we are calculating total sale amount of selected month on given above url
        const totalSaleAmount = filteredProducts.reduce((acc, product) => {
            if (product.sold) {
                return acc + product.price;
            }
            return acc;
        }, 0);

        // Next we are calculating total number of sold items of selected month
        const totalSoldItems = filteredProducts.filter(product => product.sold).length;

        // Next we are calculating total number of not sold items of selected month
        const totalNotSoldItems = filteredProducts.filter(product => !product.sold).length;

        res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Gone');
    }
}

export const getBarChart = async (req, res) => {
    const url = 'mongodb://127.0.0.1:27017/';
    const dbName = 'database';
    const collectionName = 'products';

    const client = new MongoClient.MongoClient(url);
    client.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to database successfully');
        }
    });
    const month = req.params.month;
    const monthStart = new Date(`${month} 1, 2021`);
    const monthEnd = new Date(`${month} 31, 2021`);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    try {
        const priceRanges = [
            {min: 0, max: 100},
            {min: 101, max: 200},
            {min: 201, max: 300},
            {min: 301, max: 400},
            {min: 401, max: 500},
            {min: 501, max: 600},
            {min: 601, max: 700},
            {min: 701, max: 800},
            {min: 801, max: 900},
            {min: 901, max: Infinity},
        ];

        const barChartData = [];

        for (const priceRange of priceRanges) {
            const count = await collection.countDocuments({
                price: {$gte: priceRange.min, $lte: priceRange.max},
                dateOfSale: {$gte: monthStart, $lte: monthEnd},
            });
            const priceRangeLabel = `$${priceRange.min}-${priceRange.max}`;
            barChartData.push({priceRange: priceRangeLabel, count: count});
        }
        
        res.status(200).json(barChartData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export const getPieChart = async (req, res) => {
    try {
        const { month } = req.params;

        // Fetch data from third-party API
        const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
        const response = await axios.get(API_URL);

        // Filter products sold in the specified month
        const products = response.data.filter((product) => {
            const saleMonth = new Date(product.dateOfSale).getMonth() + 1;
            return saleMonth === parseInt(month);
        });

        // Count products in each category
        const categories = {};
        products.forEach((product) => {
            const { category } = product;
            categories[category] = categories[category] ? categories[category] + 1 : 1;
        });

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// API endpoints for statistics, bar chart, and pie chart
const statisticsAPI = 'http://localhost:5000/api/statistics';
const barChartAPI = 'http://localhost:5000/api/bar-chart';
const pieChartAPI = 'http://localhost:5000/api/pie-chart';

export const getCombinedApi = async (req, res) => {
    const month = req.params.month;
    let combinedData = {};

    try {
        // Fetch data from statistics API
        const statisticsResponse = await axios.get(`${statisticsAPI}/${month}`);
        combinedData.totalSaleAmount = statisticsResponse.data.totalSaleAmount;
        combinedData.totalSoldItems = statisticsResponse.data.totalSoldItems;
        combinedData.totalNotSoldItems = statisticsResponse.data.totalNotSoldItems;

        // Fetch data from bar chart API
        const barChartResponse = await axios.get(`${barChartAPI}/${month}`);
        combinedData.priceRanges = barChartResponse.data.priceRanges;

        // Fetch data from pie chart API
        const pieChartResponse = await axios.get(`${pieChartAPI}/${month}`);
        combinedData.categories = pieChartResponse.data.categories;

        res.send(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}