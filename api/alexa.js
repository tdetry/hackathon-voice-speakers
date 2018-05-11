const express = require('express')

const router = express.Router()

// We migth want to use SDK for user authentication,... but highly integrated to landa function
// const Alexa = require('ask-sdk');

router.post('/', (req, res) => {
    console.log('user', req.body.session.user)
    console.log('request', req.body.request)
        
    // do some business logic on intent name if required
    console.log('intent', req.body.request.intent.name)
    
    const say = {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Hello! Can I help you with anything else?"
        },
        "reprompt": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Can I help you with anything else?"
          }
        },
        "shouldEndSession": false
      }
    }
    res.json(say)
})

module.exports = router