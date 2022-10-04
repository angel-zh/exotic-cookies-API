
// User resource (schema and model)

// Import Dependencies
const moongoose = require('./conneciton')
const { Schema, model } = mongoose


// Define user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)



// Export our model
module.exports = User