const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const JIFFServer = require('jiff-mpc/lib/jiff-server');
dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB successful");
  });


// Express app
const app = express();
app.use(cors());
app.use(express.json());


module.exports = app