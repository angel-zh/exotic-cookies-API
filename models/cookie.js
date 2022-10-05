const mongoose = require('mongoose')

const { Schema, model } = mongoose

const cookieSchema = new Schema({
    name: String, 
    rating: String,
    calories: Number,
    isSweet: Boolean,
    isEatenCold: Boolean
})

const Cookie = model('Cookie', cookieSchema)

module.exports = Cookie
