const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const expressSession = require('express-session')
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')

//dotenv
require('dotenv').config()

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(expressLayouts)

app.use(cookieParser('recipeSiteSecure'))
app.use(flash())
app.use(fileUpload())
app.use(expressSession({
    secret:'recipeSiteSecretSession',
    saveUninitialized: true,
    resave: true
    }))

app.set('layout', './layouts/main')

//EJS
app.set('view engine', 'ejs')

//routes
const routes = require('./server/routes/recipeRoutes')
app.use('/', routes)



//Server connect
app.listen(80, () => {
    console.log(`Server started! http://127.0.0.1:80/`)
})