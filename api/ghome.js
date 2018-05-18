const express = require('express')

const router = express.Router()

const {dialogflow} = require('actions-on-google')

const socket = require('../services/io').io();

const app = dialogflow()

const AWS = require('aws-sdk')

const sagemakerruntime = new AWS.SageMakerRuntime({region:'us-east-2'}) 

let params = {
  Body: '32',
  EndpointName: 'kmeans-2018-05-18-08-39-13-156',
  ContentType: 'text/csv'
};

// intents named matched in Dialogflow
app.intent('0_test', conv => {
  //console.log(conv)
  conv.ask('Here is the list of the closest shops to your location')
  conv.ask(`Would you like me to send the itinerary of the closest shop to your phone?`)
  socket.emit('location', 'this is a message from the backend')
})

app.intent('2_test', conv => {
  conv.ask('Here is the list of the most popular products given your profile')
  conv.ask(`Do you want me to check for promotion?`)
  socket.emit('bestsellers', 'this is a message from the backend')
})

app.intent('cluster', conv => {
  sagemakerruntime.invokeEndpoint(params, (err, data) => {
    let results = 'test'  
    if (err) { console.log('AWS ' + err, err.stack) } // an error occurred
    else { 
          results = data.Body.toString('utf8')
          console.log(results)
          socket.emit('cluster', results)
    }
  })
    conv.ask('Here is your score')
    conv.ask(`Do you want something else?`)
})

app.intent('joke', conv => {
    socket.emit('joke', 'joke')
    conv.ask('Computer says no')
    conv.ask(`Do you want something else?`)
})


router.use('/', app)

module.exports = router