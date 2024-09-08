const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");


dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB successful");
  });


// Express app
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth' , require('./routes/auth'))
app.use('/api/v1/vote', require('./routes/vote'))

module.exports = app