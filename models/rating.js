// we are making a subdocument here

// Import Dependencies
const mongoose = require('./connection')
// subdocuments are not models, they are associated with a model
const { Schema } = mongoose

// comment schema
const ratingSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

// Export our schema
module.exports = ratingSchema