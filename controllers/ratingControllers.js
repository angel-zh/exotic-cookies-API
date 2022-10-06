
// Import Dependencies
const express = require('express')
const Cookie = require('../models/cookie')


// Create Router
const router = express.Router()


// Routes
// POST
// only loggedIn users can post ratings
router.post('/:cookieId', (req, res) => {
    const cookieId = req.params.cookieId
    if (req.session.loggedIn) {
        // we want to adjust req.body so that the author is automatically assigned
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // find a specific cookie
    Cookie.findById(cookieId)
        .then(cookie => {
            // push the rating into the cookie.ratings array
            cookie.ratings.push(req.body)
            // we need to save the cookie
            return cookie.save()
        })
        .then(cookie => {
            res.status(200).json({ cookie: cookie })
        })
        .catch(error => console.log(error))
})

// DELETE
// only the author of the rating can delete it
router.delete('/delete/:cookieId/:ratingId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const cookieId = req.params.cookieId 
    const ratingId = req.params.ratingId
    Cookie.findById(cookieId)
        .then(cookie => {
            // get the rating
            // subdocs have a built in method that you can use to access specific subdocuments when you need to
            // this built in method is called .id()
            const theRating = cookie.ratings.id(ratingId)
            // console.log('this is the rating that was found', theRating)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the rating delete it
                if (theRating.author == req.session.userId) {
                    theRating.deleteOne()
                    cookie.save()
                    res.sendStatus(204)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        .catch(error => console.log(error))
})


// Export the Router
module.exports = router