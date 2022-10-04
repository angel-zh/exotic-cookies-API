
// Import Dependencies
const mongoose = require('./connection')
const Snack = require('./snack')

// Seed Script Code
const db = mongoose.connection
db.on('open', () => {
    const sweetSnacks = [
        { name: 'Chocolate Mousse', calories: 355, isHealthy: false, isEatenCold: true },
        { name: 'Applesauce', calories: 105, isHealthy: true, isEatenCold: false },
        { name: 'Strawberry Shortcake', calories: 625, isHealthy: false, isEatenCold: true },
        { name: 'Peanut Butter Granola Bar', calories: 120, isHealthy: true, isEatenCold: false },
        { name: 'Vanilla Ice Cream', calories: 270, isHealthy: false, isEatenCold: true },
        { name: 'Brownie', calories: 425, isHealthy: false, isEatenCold: false },
    ]
    Snack.deleteMany({})
        .then(deletedSnacks => {
            console.log('this is what .deleteMany returns', deletedSnacks)
            Snack.create(sweetSnacks)
                .then(data => {
                    console.log('here are the newly created snacks', data)
                    db.close()
                })
                .catch(err => {
                    console.log(err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})