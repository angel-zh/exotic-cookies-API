///// Import dependencies //////
require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const mongoose = require("mongoose") 
const path = require("path") 

const Snack = require('./models/snack')

///// Database connection //////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(DATABASE_URL, CONFIG)
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (error) => console.log('An error occurred: \n', error))


/////// Express App Object ////////
const app = express()

///// Middleware ///////
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())


/////// Routes /////////
app.get('/', (req, res) => {
    res.send(`<body style="background-color:pink;text-align:center"><h1>Welcome to the Sweet Snacks API homepage!</h1><p>Here you will find some information about different sweet snacks. Enjoy!</p></body>`)
})


////// Server Listener ///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))