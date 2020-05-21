const request = require('request')
const geoCode = (adsress , callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adsress) 
        + '.json?access_token=pk.eyJ1Ijoid2VzYW15YWtvdXQiLCJhIjoiY2thY3VjenIzMDExbDJ1bnh2YzYxNmx2cyJ9.PzGMNG-GiaIWozhw7cw08g&limit=1'

    request({url , json : true} , (error , response) => {
        if(error)
            callback('unable to connect to the weather service!' , undefined)
        else if(response.body.features.length === 0)
            callback('Unable to find location' , undefined)
        else {
            callback(undefined , {
                longitude : response.body.features[0].center[1] ,
                latitude : response.body.features[0].center[0] ,
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode