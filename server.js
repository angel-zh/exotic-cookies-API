///// Import dependencies //////
require("dotenv").config() 
const express = require("express") 

const path = require("path") 
const SnackRouter = require('./controllers/snackControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


/////// Express App Object ////////
const app = express()

///// Middleware ///////
middleware(app)


/////// Routes /////////
// Homepage
app.get('/', (req, res) => {
    res.send(`<body style="background-color:pink;text-align:center"><h1>Welcome to the Sweet Snacks API homepage!</h1><p>Here you will find some information about different sweet snacks. Enjoy!</p></body>`)
})
// Register our Routs
app.use('/snacks', SnackRouter)
app.use('/users', UserRouter)

////// Server Listener ///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))