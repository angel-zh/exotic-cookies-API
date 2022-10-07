///// Import dependencies //////
require("dotenv").config() 
const express = require("express") 

const path = require("path") 
const CookieRouter = require('./controllers/CookieControllers')
const CommentRouter = require('./controllers/commentControllers')
const RatingRouter = require('./controllers/ratingControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


/////// Express App Object ////////
// const app = express()
const app = require('liquid-express-views')(express())

///// Middleware ///////
middleware(app)


/////// Routes /////////
// Homepage
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/cookies')
    } else {
        res.render('index.liquid')
    }
})

// Register our Routes
// first argument is base url endpoint, second is the file to use
app.use('/cookies', CookieRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)
app.use('/ratings', RatingRouter)

app.get('/error', (req, res) => {
    // get session variables
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist.'
    res.render('error.liquid', { error, username, loggedIn, userId })
})

// this is a catch-all route that will redirect to the error page for anything that doesn't satisfy a controller
app.all('*', (req, res) => {
    res.redirect('/error')
})
////// Server Listener ///////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))