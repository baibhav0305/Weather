console.log('Client side JavaScript is LOADED !!!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?city=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data);
            // console.log(data.forecast);
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                const forecast = data.forecast
                messageOne.textContent = data.location
                messageTwo.textContent = 'Temperature: ' + forecast.temperature
                messageThree.textContent = 'Feels Like: ' + forecast.feels_like
                // console.log(data.location);
                // console.log(data.forecast);
            }
        })
    })
})