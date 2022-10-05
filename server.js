///// Import dependencies //////
require("dotenv").config() 
const express = require("express") 

const path = require("path") 
const CookieRouter = require('./controllers/CookieControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


/////// Express App Object ////////
const app = express()

///// Middleware ///////
middleware(app)


/////// Routes /////////
// Homepage
app.get('/', (req, res) => {
    res.send(`<body style="background-color:pink;text-align:center"><h1>Welcome to the Exotic Cookies API homepage!</h1><p>Here you will find some information about unique cookie flavors. Enjoy!</p></body>`)
})
// Register our Routs
app.use('/cookiess', CookieRouter)
app.use('/users', UserRouter)

////// Server Listener ///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))