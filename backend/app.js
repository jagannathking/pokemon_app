const express = require('express');
const cors = require('cors');

// Use require for local files, remove .js
const database = require('./config/database');
const PokemonRoutes = require('./routes/pokemon.routes');
const { seedDatabase } = require('./utils/seeder');

const app = express();

// Middleware 
// app.use(cors({
//     origin:["https://pokemon-app-4wer.vercel.app","http://localhost:5173"]
// }));

app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://192.168.162.84:5173",
        "http://172.18.128.1:5173",
        "https://pokemon-app-4wer.vercel.app",

      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "X-Requested-With",
      ],
    })
  );



app.use(express.json());

// Database Connection and Seeding
database()
    .then(() => {
        console.log("Database connection successful in app.js. Initiating seeding...");
        seedDatabase();
    })
    .catch(error => {
        console.error("Database connection failed in app.js, seeding will not occur:", error.message);
    });

app.use("/api/pokemon", PokemonRoutes);

// Test/Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pokedex Backend Server is Healthy"
    });
});

app.use((err, req, res, next) => {
    console.error("Unhandled Error in Express:", err.stack || err);
    res.status(500).json({ message: 'Internal Server Error!' });
});

module.exports = app;