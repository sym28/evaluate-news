function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field and replace spaces with % for api call
    let formText = document.getElementById('name').value.replace(/ /gi, '%20')
    Client.checkForName(formText)

    // api url variables
    let string1 = 'https://api.meaningcloud.com/sentiment-2.1?key='
    let outputFormat = '&of=json&txt='
    let model = '&model=general&lang=en'

    
    console.log("::: Form Submitted :::")
    // get api key from server
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then((apiKey) => {

        // build api url
        const apiString = string1 + apiKey.api_key + outputFormat + formText + model
        // fetch call to external api
        fetch(apiString)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            const queryResponseText = `You submission was in ${res.agreement.toLowerCase()} with a confidence of ${res.confidence} and the text was ${res.irony.toLowerCase()}`
            document.getElementById('results').innerHTML = queryResponseText
        })
    })
}

export { handleSubmit }
