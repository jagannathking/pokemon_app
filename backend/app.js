import express from 'express';
import cors from 'cors'

import database from './config/database.js'
import PokemonRoutes from './routes/pokemon.routes.js'
import { seedDatabase } from './utils/seeder.js';


const app = express();


// data base connection
database()
    .then(() => {
        console.log("Database connection successful in app.js. Initiating seeding...");
        seedDatabase();
    })
    .catch(error => {
        console.error("Database connection failed, seeding will not occur:", error.message);
    });


// middleware
app.use(express.json());
app.use(cors());


// All Routes
app.use("/api/pokemon", PokemonRoutes)


// Test routes
app.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "server is Healthy"
    })
})

export default app;