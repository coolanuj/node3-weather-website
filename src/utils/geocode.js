const request = require('request')

const geocode = (location, callback)=>{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYW51am1pc2hyYSIsImEiOiJja2JkaGZ2bGIwNXpqMzBwMmZ5Y3l4NzlnIn0.MtefpgtpyZWj1wGl2Fz1Xw'
    request({ url: url, json: true}, (error, response)=>{
    //destructuring
    // request({ url: url, json: true}, (error, { body })=>{    
        if(error){ //low level error(os level like no net connectivity)
            callback('Unable to connect mapbox service', undefined)
        }else if(response.body.error){ //error handling for result
            callback('Unable to connect mapbox service', undefined)
        }else if(response.body.features.length === 0){
            callback('No Loation found', undefined)
        }else{
            const { features } = response.body;
            callback(undefined, {
                long: features[0].center[0],
                lat: features[0].center[1],
                location
                
            })
            
        }      
    })

}

module.exports = geocode


