
// Import Dependencies
const express = require('express')
const Cookie = require('../models/cookie')


// Create Router
const router = express.Router()

// Routes
// GET all cookies
// Index Route
router.get('/', (req, res) => {
    Cookie.find({})
        .populate('comments.author', 'username')
        .populate('ratings.author', 'username')
        .then(cookies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // here, we're going to render page but we can also send data that we got from the database to that liquid page for rendering, this data is an object that contains all cookies
            res.render('cookies/index', { cookies, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET for new cookie
// renders the form to create a cookie
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render('cookies/new', { username, loggedIn, userId })
})

// GET for owner's cookies
// index route, owner-specific, to list all cookies owned by logged in user
router.get('/mine', (req, res) => {
    // find cookies by owner and display them
    Cookie.find({ owner: req.session.userId })
        .then(cookies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('cookies/index', { cookies, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
    })

// GET one cookie
// Show Route
router.get('/:id', (req, res) => {
    const cookieId = req.params.id
    Cookie.findById(cookieId)
        .populate('comments.author', 'username')
        .populate('ratings.author', 'username')
        .then(cookie => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('cookies/show', { cookie, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// POST for new cookie
// Create route
router.post('/', (req, res) => {
    // bc our checkboxes dont send true or false(which they totally should but whatev)
    // we need to do some js magic to change the value
    req.body.isSweet = req.body.isSweet === 'on' ? true : false
    req.body.isEatenCold = req.body.isEatenCold === 'on' ? true : false
    req.body.owner = req.session.userId
    Cookie.create(req.body)
        .then(cookie => {
            res.redirect('/cookies')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// GET update page
// show the update page
router.get('/edit/:id', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const cookieId = req.params.id
    Cookie.findById(cookieId)
        .then (cookie => {
            res.render('cookies/edit', { cookie, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// PUT
// Update a cookie
router.put('/:id', (req, res) => {
    const cookieId = req.params.id
    req.body.isSweet = req.body.isSweet === 'on' ? true : false
    req.body.isEatenCold = req.body.isEatenCold === 'on' ? true : false
    Cookie.findById(cookieId)
        .then(cookie => {
            // if the cookie's owner is the current logged in user
            if (cookie.owner == req.session.userId) {
                return cookie.updateOne(req.body)
            // if owner is not the user, unauthorized status
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/cookies/${cookieId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// DELETE a cookie
router.delete('/:id', (req, res) => {
    // get the cookie id
    const cookieId = req.params.id
    // delete and REDIRECT
    Cookie.findByIdAndRemove(cookieId)
        .then(cookie => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/cookies')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// Export the Router
module.exports = router