const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 5500

// set templating engine
app.set('view engine', 'ejs')
// set views folder
app.set('views', path.join(__dirname, 'views'))
// use static files from public folder
app.use(express.static(__dirname + '/public'))


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60)
    next()
})

// import routers
const homeRoute = require('./routers/home')

// use routers
app.use('/', homeRoute)

app.get('/offline', (req, res) => {
    res.render('pages/offline')
})

app.use((req, res) => {
    res.status(404).render('pages/404', {
        title: 'ERROR404',
    })
})

// Express listens to port 8000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})