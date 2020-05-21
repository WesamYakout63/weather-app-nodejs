// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const button = document.querySelector('#my-location')


button.addEventListener('click' , (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch('http://localhost:3000/weather?lat=' + position.coords.latitude + '&long=' + 
            position.coords.longitude).then((response) => {
                response.json().then((data) => {
                    if(data.error)
                        messageOne.textContent = data.error
                    else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.weather
                    }
                })
            })          
        })
    }
    else {
        console.log('You haven`t permit to access your location')
    }
})

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    // console.log(search.value)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error)
                messageOne.textContent = data.error
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.weather
            }
        })
    })
})


