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
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
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
