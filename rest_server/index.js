require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});