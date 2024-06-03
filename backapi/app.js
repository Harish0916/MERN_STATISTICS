import express from 'express';
import { Product } from './db/database.js';
import { initializeDatabase } from './db/todb.js';
import { router } from './routes/index.js';
import cors from 'cors';

const PORT = 5000;

// call fetching functionality so that data tobe inserted into database.
// initializeDatabase();

// Creating app instance for express to use middleware
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', router)

const start = async () => {
    try {
        app.listen(PORT, ()=> console.log(`Listen on Port http://localhost:${PORT}/`))
    } catch (error) {
        console.log(error)
    }
}
start();
