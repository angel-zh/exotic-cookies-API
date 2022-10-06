
// Import Dependencies
const express = require('express')
const Cookie = require('../models/cookie')


// Create Router
const router = express.Router()

// Routes
// GET all fruits
// Index Route
router.get('/', (req, res) => {
    Cookie.find({})
        .populate('comments.author', 'username')
        .then(cookies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // here, we're going to render page but we can also send data that we got from the database to that liquid page for rendering, this data is an object that contains all cookies
            res.render('cookies/index', { cookies, username, loggedIn, userId })
        })
        .catch(err => console.log(err))
})

// GET for new cookie
// renders the form to create a cookie
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render('cookies/new', { username, loggedIn, userId })
})

// GET for owner's fruits
// another index route, owner-specific, to list all cookies owned by logged in user
router.get('/mine', (req, res) => {
    // find fruits by owner and display them
    Cookie.find({ owner: req.session.userId })
        .then(cookies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('cookies/index', { cookies, username, loggedIn, userId })
        })
        .catch(err => res.json(err))
})

// GET one cookie
// Show Route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findById(id)
        .then(cookie => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // res.json({ fruit: fruit })
            res.render('cookies/show', { cookie, username, loggedIn, userId })
        })
        .catch(err => res.json(err))
})

// POST for new fruit
// Create route
router.post('/', (req, res) => {
    // bc our checkboxes dont send true or false(which they totally should but whatev)
    // we need to do some js magic to change the value
    req.body.isSweet = req.body.isSweet === 'on' ? true : false
    req.body.isEatenCold = req.body.isEatenCold === 'on' ? true : false
    req.body.owner = req.session.userId
    Cookie.create(req.body)
        .then(cookie => {
            res.redirect('/fruits')
        })
        .catch(err => res.json(err))
})

// PUT
// Update Route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findById(id)
        .then(cookie => {
            // if the cookie's owner is the current logged in user
            if (cookie.owner == req.session.userId) {
                res.sendStatus(204)
                return cookie.updateOne(req.body)
            // if owner is not the user, unauthorized status
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => res.json(err))
})


// DELETE a fruit
router.delete('/:id', (req, res) => {
    // get the fruit id
    const cookieId = req.params.id
    // delete and REDIRECT
    Cookie.findByIdAndRemove(cookieId)
        .then(cookie => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/cookies')
        })
        .catch(error => {
            res.json({ error })
        })
})


// Export the Router
module.exports = router