require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Import routes
const questionRoutes = require('../routes/question');

// Middleware
app.use(cors({origin:"*"}));


app.use(express.json());

// Routes
app.use('/questions', questionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

app.listen(4000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;