const express = require('express')

const router = express.Router()

const {dialogflow} = require('actions-on-google')

const socket = require('../services/io').io();

const app = dialogflow()

const request = require('request')

// intents named matched in Dialogflow
app.intent('0_test', conv => {
  //console.log(conv)
  conv.ask('Here is the response from the test intent!')
  //request('http://sagemake.com', {data: {age: 23, gender, 'm'}}).then()
  conv.ask(`What else can I do for you?`)
  socket.emit('notification', 'this is a message from the backend')
})

router.use('/', app)

module.exports = router