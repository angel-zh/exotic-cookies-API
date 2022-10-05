
// Import Dependencies
const express = require('express')
const Snack = require('../models/snack')


// Create Router
const router = express.Router()

// Routes
// Index Route
router.get('/', (req, res) => {
    Snack.find({})
        .then(snacks=> {
            res.json({ snacks: snacks})
    })
    .catch(err => console.log(err))
})


// Show Route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Snack.findById(id)
        .then(snack =>  {
            res.json({ snack: snack })
        })
        .catch(err => console.log(err))
})


// Create route
router.post('/', (req, res) => {
    Snack.create(req.body)
        .then(snack => {
            res.status(201).json({ snack: snack.toObject() })
        })
        .catch(err => console.log(err))
})


// Update Route
router.put('/:id', (req, res) => {
    const id = req.params.id
    Snack.findByIdAndUpdate(id, req.body, {new: true})
        .then(snack => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})


// Delete Route
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Snack.findByIdAndRemove(id)
        .then(snack =>  {
            res.sendStatus(204)
    })
        .catch(err => console.log(err))
})


// Export the Router
module.exports = router