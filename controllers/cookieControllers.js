
// Import Dependencies
const express = require('express')
const Snack = require('../models/snack')


// Create Router
const router = express.Router()

// Routes
// Index Route
router.get('/', (req, res) => {
    Cookie.find({})
        .then(cookies=> {
            res.json({ cookies: cookies})
    })
    .catch(err => console.log(err))
})


// Show Route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Snack.findById(id)
        .then(cookie =>  {
            res.json({ cookie: cookie })
        })
        .catch(err => console.log(err))
})


// Create route
router.post('/', (req, res) => {
    Cookie.create(req.body)
        .then(cookie => {
            res.status(201).json({ cookie: cookie.toObject() })
        })
        .catch(err => console.log(err))
})


// Update Route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findByIdAndUpdate(id, req.body, {new: true})
        .then(snack => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})


// Delete Route
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Cookie.findByIdAndRemove(id)
        .then(cookie =>  {
            res.sendStatus(204)
    })
        .catch(err => console.log(err))
})


// Export the Router
module.exports = router