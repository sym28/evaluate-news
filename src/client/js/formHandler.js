function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    let validFormText = Client.checkForName(formText)

    if(validFormText){

        // check what text was put into the form field and replace spaces with % for api call
        formText = document.getElementById('name').value.replace(/ /gi, '%20')

        const data = {
            userInput: formText
        }

        // send user input to server for api call
        fetch('http://localhost:8081/api-call', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        console.log("::: Form Submitted :::")

        // get api response from server
        fetch('http://localhost:8081/api-response')
        .then(res => res.json())
        .then(data => {
            console.log('retrieved data from server:', data.apiResponse)
            document.getElementById('results').innerHTML = data.apiResponse
        })
        
    } else {
        document.getElementById('results').innerHTML = 'Sentence too short. Please add more.'
    }

}




export { handleSubmit }
