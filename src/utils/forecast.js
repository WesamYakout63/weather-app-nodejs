const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/979d02b3667d482ee4d3b62845b2323e/' + longitude + ',' 
        + latitude + '?units=si'

    request({ url , json: true} , (error , response) => {
        // console.log(JSON.parse(response.body).currently)
        if(error)
            callback('unable to connect to the weather service!' , undefined)
        else if(response.body.error)
            callback('Unable to find location' , undefined)
        else
            callback(undefined , response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degree out. There is a ' + 
                response.body.currently.precipProbability + '% chance of rain.')
    })
}

module.exports = forecast