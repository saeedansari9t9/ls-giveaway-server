const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5173', // Vite default local
    'https://ls-giveaway-client.vercel.app' // Deployed frontend
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api', apiRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Lexora Giveaway API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
