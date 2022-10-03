const mongoose = require('mongoose')

const { Schema, model } = mongoose

const snackSchema = new Schema({
    name: String, 
    calories: Number,
    isHealthy: Boolean,
    isEatenCold: Boolean
})

const Snack = model('Snack', snackSchema)

module.exports = Snack
