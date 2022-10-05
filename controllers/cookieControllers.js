
// Import Dependencies
const express = require('express')
const Snack = require('../models/snack')


// Create Router
const router = express.Router()

// Routes
// Index Route
router.get('/', (req, res) => {
    Cookie.find({})
        .populate('comments.author', 'username')
        .then(cookies => {
            res.json({ cookies: cookies })
        })
        .catch(err => console.log(err))
})


// Show Route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Snack.findById(id)
        .then(cookie => {
            res.json({ cookie: cookie })
        })
        .catch(err => console.log(err))
})


// Create route
router.post('/', (req, res) => {
    // add ownership via a foreign key reference to our fruits
    // append our request body with the 'owner' field set to the logged in user's Id
    req.body.owner = req.session.userId
    Cookie.create(req.body)
        .then(cookie => {
            res.status(201).json({ cookie: cookie.toObject() })
        })
        .catch(err => console.log(err))
})


// Update Route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findById(id)
        .then(cookie => {
            // if the fruit's owner is the current logged in user
            if (fruit.owner == req.session.userId) {
                res.sendStatus(204)
                return cookie.updateOne(req.body)
            // if owner is not the user
            } else {
                res.sendStatus(401)
            }
        })
        .catch(err => res.json(err))
})


// Delete Route
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findByIdAndRemove(id)
        .then(cookie => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// Export the Router
module.exports = router