const express = require('express')

const router = express.Router()

const {dialogflow} = require('actions-on-google')

const socket = require('../services/io').io();

const app = dialogflow()

const AWS = require('aws-sdk')

const sagemakerruntime = new AWS.SageMakerRuntime({region:'us-east-2'}) 

let params = {
  Body: '32',
  EndpointName: 'kmeans-2018-05-18-11-24-44-529',
  ContentType: 'text/csv'
};

// intents named matched in Dialogflow
app.intent('3_location', conv => {
  //console.log(conv)
  conv.ask('This is the closest place where this computer is still in stock')
  conv.ask(`Would you like me to send the itinerary to your phone?`)
  socket.emit('location', 'this is a message from the backend')
})

app.intent('2_reco', conv => {
  conv.ask('Given your profile, here are the bestsellers.')
  conv.ask(`Do you like one of them?`)
  socket.emit('bestsellers', 'this is a message from the backend')
})

app.intent('2_help_reco', conv => {
  sagemakerruntime.invokeEndpoint(params, (err, data) => {
    let results = 'test'  
    if (err) { console.log('AWS ' + err, err.stack) } // an error occurred
    else { 
          results = data.Body.toString('utf8')
          console.log(results)
          socket.emit('cluster', results)
    }
  })
    conv.ask('Here is my recommendation')
    conv.ask(`Do you like it?`)
})

app.intent('joke', conv => {
    socket.emit('joke', 'joke')
    conv.ask('Computer says no')
    conv.ask(`Do you want something else?`)
})


router.use('/', app)

module.exports = router