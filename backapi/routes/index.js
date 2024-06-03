import express from 'express';
import { getProducts, getStatistics, getBarChart, getPieChart, getCombinedApi } from '../controllers/index.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/statistics/:month', getStatistics);
router.get('/bar-chart/:month', getBarChart)
router.get('/pie-chart/:month', getPieChart)
router.get('/combined-data/:month', getCombinedApi)

export {router}