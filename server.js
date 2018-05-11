const express = require('express')

const morgan = require('morgan')

const bodyParser = require('body-parser')

const app = express()

const ghome = require('./api/ghome')


// Basic loggin
app.use(morgan('combined'))

// Parsing incoming request
app.use(bodyParser.json())

// Test endpoint
app.get('/', (req, res) => {
  res.json({ response: 'Hello, everythings looks OK!' })
})

// Google Action SDK webhook 
app.use('/ghome', ghome)

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found')
})

// Basic error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.response || 'Something broke!')
})

// Starting
const port = process.env.PORT || 3000
app.listen(port, () => console.log('Backend app listening on port 3000!'))
