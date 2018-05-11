const express = require('express')

const router = express.Router()

const {dialogflow} = require('actions-on-google')

const app = dialogflow()

// intents named matched in Dialogflow
app.intent('0_test', conv => {
  //console.log(conv)
  conv.ask('Here is the response from the test intent!')
  conv.ask(`What else can I do for you?`)
})

router.use('/', app)

module.exports = router