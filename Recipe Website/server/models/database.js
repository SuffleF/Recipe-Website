//Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.mongoURL, {UseUnifiedTopology: true, useNewUrlParser: true}, mongoose.set('strictQuery', false))

const database = mongoose.connection
database.on('error', console.error.bind(console, 'Connection Error'))
database.once('open', function() {
    console.log('Database Connected')
})

//Models
require('./Category')
require('./Recipe')
