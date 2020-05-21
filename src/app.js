const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , '../templates/views'))
hbs.registerPartials(path.join(__dirname , '../templates/partials'))
app.use(express.static(path.join(__dirname , '../public')))

app.get('' , (req , res) => {
    res.render('index' , {
        title : 'Weather App' ,
        name : 'Wesam Yakout'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'About me' ,
        name : 'Wesam Yakout'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        title : 'Help' ,
        message : 'Enter valid location on the input box then click search to get the weather info.' ,
        name : 'Wesam Yakout'
    })
})

app.get('/weather' , (req , res) => {
    if(req.query.lat && req.query.long) {
        forecast(req.query.long , req.query.lat , (error , forecastdata) => {
            if(error)
                return res.send({
                    error : error
                })
            res.send({
                location : 'Your Location' ,
                weather : forecastdata 
            })
        })
    }
    else {
        if(!req.query.address)
        return res.send({
            error : 'You should provide Address'
        })
        geoCode(req.query.address , (error , {location , longitude , latitude} = {}) => {
            if(error)
                return res.send({
                    error : error
                })
            forecast(latitude , longitude , (error , forecastdata) => {
                if(error)
                    return res.send({
                        error : error
                    })
                res.send({
                    location : location ,
                    address : req.query.address ,
                    weather : forecastdata 
                })
            })
        })
    }
    
    // res.send({
    //     address : req.query.address , 
    //     forecast : '50'
    // })
})

// app.get('/product' , (req , res) => {
//     if(!req.query.search)
//         return res.send({
//             error : 'You must provide search term'
//         })
//     console.log(req.query.search)
//     res.send({
//         products : []
//     })
// })

app.get('/help/*' , (req , res) => {
    res.render('error' , {
        title : '404 page is not found' ,
        message : 'Help article is not found' ,
        name : 'Wesam Yakout'
    })
})

app.get('*' , (req , res) => {
    res.render('error' , {
        title : '404 page is not found' ,
        message : 'Page is not found' ,
        name : 'Wesam Yakout'
    })
})

app.listen(3000 , () => {
    console.log('server is up at port 3000')
})
