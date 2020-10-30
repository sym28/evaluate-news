const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')

const data = {}

const app = express()

app.use(cors())

app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname) 

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('app listening on port 8081!')
})

// send api response to client
app.get('/api-response', function (req, res) {
    res.send(data)
})

// handle user input from client then make a fetch call to external api
app.post('/api-call', (req, res) => {
    console.log('post request recieved')
  
    let string1 = 'https://api.meaningcloud.com/sentiment-2.1?key='
    let outputFormat = '&of=json&txt='
    let model = '&model=general&lang=en'

    // build api url
    const apiString = string1 + process.env.API_KEY + outputFormat + req.body + model
    
    // fetch call to external api then add response to data object
    fetch(apiString)
    .then(res => res.json())
    .then((res) => {
        const queryResponseText = `You submission was in ${res.agreement.toLowerCase()} with a confidence of ${res.confidence} and the text was ${res.irony.toLowerCase()}`
        data['apiResponse'] = queryResponseText
    })
})