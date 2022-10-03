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
// Homepage
app.get('/', (req, res) => {
    res.send(`<body style="background-color:pink;text-align:center"><h1>Welcome to the Sweet Snacks API homepage!</h1><p>Here you will find some information about different sweet snacks. Enjoy!</p></body>`)
})


// Seed Route
app.get('/snacks/seed', (req, res) => {
    const sweetSnacks = [
        { name: 'Chocolate Mousse', calories: 355, isHealthy: false, isEatenCold: true },
        { name: 'Applesauce', calories: 105, isHealthy: true, isEatenCold: false },
        { name: 'Strawberry Shortcake', calories: 625, isHealthy: false, isEatenCold: true },
        { name: 'Peanut Butter Granola Bar', calories: 120, isHealthy: true, isEatenCold: false },
        { name: 'Vanilla Ice Cream', calories: 270, isHealthy: false, isEatenCold: true },
        { name: 'Brownie', calories: 425, isHealthy: false, isEatenCold: false },
    ]
    Snack.deleteMany({})
        .then(() => {
            Snack.create(sweetSnacks)
                .then(data => {
                    res.json(data)
                })
        })
})


// Index Route
app.get('/snacks', (req, res) => {
    Snack.find({})
        .then(snacks=> {
            res.json({ snacks: snacks})
    })
    .catch(err => console.log(err))
})


// Show Route
app.get('/snacks/:id', (req, res) => {
    const id = req.params.id
    Snack.findById(id)
        .then(snack =>  {
            res.json({ snack: snack })
        })
        .catch(err => console.log(err))
})

////// Server Listener ///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))