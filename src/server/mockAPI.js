let string1 = 'https://api.meaningcloud.com/sentiment-2.1?key='
let apiKey = process.env.API_KEY
let outputFormat = '&of=json'
let searchText = '&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.'
let model = '&model=general&lang=en'

let fetchCall = string1 + apiKey + outputFormat + searchText + model

let textApi = {
    api_key: process.env.API_KEY,
    api_call: fetchCall

}



module.exports = textApi
