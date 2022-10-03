///// Import dependencies //////
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 

///// Database connection //////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)