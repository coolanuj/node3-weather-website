const request = require('request')

const forcast = (query, callback)=>{
const url =  'http://api.weatherstack.com/current?access_key=5b16c97fd877e7d82905a6693543ec2a&query='+query
    request({ url: url, json: true}, (error, response)=>{
        if(error){ //low level error(os level like no net connectivity)
            callback('Unable to connect weather service', undefined)
        }else if(response.body.error){ //error handling for result
            callback('Unable to connect weather service', undefined)
        }else{
            const { location:loc , current } = response.body
            callback(undefined,  `${loc.name}, ${loc.country}, ${loc.region}: ${current.weather_descriptions}. It is currently ${current.temperature} degree out. It feels like ${current.feelslike} degree out.`)
            
        }      
    })

}

module.exports = forcast


