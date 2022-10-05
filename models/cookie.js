// Our Schema and model for the cookie resource

// import Dependencies
const mongoose = require('mongoose')
const User = require('./user') 
const commentSchema = require('./comment')

// Schema and model pulled from mongoose
// use syntax called 'destructuring'
const { Schema, model } = mongoose

// cookie Schema
const cookieSchema = new Schema({
    name: String, 
    rating: String,
    calories: Number,
    isSweet: Boolean,
    isEatenCold: Boolean,
    owner: {
        // references the type 'ObjectId', the '._id' 
        type: Schema.Types.ObjectId,
        // references the User model
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

// cookie model
// first argument is the name assigned to the model
// second argument is what's used to build the model
const Cookie = model('Cookie', cookieSchema)


// export model
module.exports = Cookie
