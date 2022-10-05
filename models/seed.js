
// Import Dependencies
const mongoose = require('./connection')
const Cookie = require('./cookie')

// Seed Script Code
const db = mongoose.connection
db.on('open', () => {
    const startCookies = [
        { name: 'Chocolate Mousse Cookie', rating: '4/5', calories: 320, isSweet: true, isEatenCold: true },
        { name: 'Applesauce Cookie', rating: '3/5', calories: 115, isSweet: true, isEatenCold: false },
        { name: 'Strawberry Shortcake Cookie', rating: '4/5', calories: 285, isSweet: true, isEatenCold: true },
        { name: 'Almond Ice Cream Cookie', rating: '3.5/5', calories: 280, isSweet: true, isEatenCold: true },
        { name: 'Beef Jerky Cookie', rating: '5/5', calories: 300, isSweet: false, isEatenCold: false },
        { name: 'Cheesy Lobster Cookie', rating: '4.5/5', calories: 320, isSweet: false, isEatenCold: false },
        { name: 'Meatball Marinara Cookie', rating: '4/5', calories: 385, isSweet: false, isEatenCold: false },
        { name: 'The Too Healthy Cookie', rating: '4/5',calories: 120, isSweet: true, isEatenCold: false }
    ]
    Cookie.deleteMany({})
        .then(deletedCookies => {
            console.log('this is what .deleteMany returns', deletedCookies)
            Cookie.create(startCookies)
                .then(data => {
                    console.log('here are the newly created cookies', data)
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