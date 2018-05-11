const express = require('express')

const router = express.Router()

const {dialogflow} = require('actions-on-google')

const app = dialogflow()

app.intent('0_test', conv => {
  //console.log(conv)
  console.log('0_problem triggered')    
  conv.ask('Here is the response from the test intent?')
  conv.ask(`How are you?`)
})

router.use('/', app)

module.exports = router