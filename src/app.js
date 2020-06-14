const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()
const port = process.env.PORT || 3000
// set template engine
app.set('view engine', 'hbs')
//customise view Directory from views to templates folder. By default is folder is views
app.set('views', path.join(__dirname, '../templates'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//set static file path
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=>{
    res.render('views/index', {
        title: 'Search for weather',
        name: "Anuj Mishra"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {lat, long, location} = {})=>{
        if(error){
            return res.send({
                error: "Unable to get location"
            })
        }
        
        forcast(lat+','+long, (error, forcastData)=>{
            return res.send({
                forcast: forcastData,
                long,
                lat,
                location
            })
        })
        

    })
})

app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide search term"
        })
    }
    console.log('A')
    res.send({
        product: req.query
    })
})
app.get('/help', (req, res)=>{
    res.render('views/help', {
        title: 'Commimg Soon.......',
        name: "Anuj Mishra"
    })
})
app.get('/about', (req, res)=>{
    res.render('views/about', {
        title: 'Anuj Mishra',
        name: "Anuj Mishra"
    })
})


//404 page
//*: anything
app.get('*', (req, res)=>{
    res.render('views/404', {
        title: '404 ERROR'
    })
})


//80 & 443 : https & http
app.listen(port,()=>{
    console.log('Server is running on '+port)
})