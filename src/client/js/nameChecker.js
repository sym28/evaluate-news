function checkForName(inputText) {
    
    if(inputText.length >= 5) {
        console.log('user input valid')
        return true
    } else {
        console.log('user input invalid')
        return false
    }
}

export { checkForName }
