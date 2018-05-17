const path = require('path')

const express = require('express')

const morgan = require('morgan')

const bodyParser = require('body-parser')

const app = express()

const http = require('http').Server(app)

const io = require('./services/io').initialize(http)

const ghome = require('./api/ghome')

const alexa = require('./api/alexa')

const ejs = require('ejs')

// Basic loggin
app.use(morgan('combined'))

// Parsing incoming request
app.use(bodyParser.json())


app.set('views', path.join(__dirname, '', 'frontend/dist'))
  .set('view engine', 'ejs')
  .engine('html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, '', 'frontend/dist')))

app.get('/', function (req, res) {
  res.render('index')
})

/* Serving static files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});
*/

// Test/Health endpoint
app.get('/healthz', (req, res) => {
  res.json({ response: 'Hello, everythings looks OK!' })
})

// Google Action SDK webhook 
app.use('/ghome', ghome)

// Alexa webhook 
app.use('/alexa', alexa)

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found')
})

// Basic error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.response || 'Something broke!')
})

// Starting
const port = process.env.PORT || 3000

http.listen(port, function(){
  console.log(`listening on ${port}`);
});