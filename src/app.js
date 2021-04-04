const path = require('path');
const express = require('express');
const request = require('request');
const hbs = require('hbs');
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");
const app = express();

console.log(__dirname);
console.log(__filename);

// index.htmlfile is wrapped in place 
// of res.send('<h1> Hello express </h1>') of app.get('',(req,res))

// define paths of express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


// app.get('', (req, res) => {
//     res.send('<h1>Hello express </h1>');
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashish'

    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ashish',
        helptext: 'This is a help text'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashish'

    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error });
        }

        foreCast(latitude, longitude, (error, forCastData) => {
            if (error) {
                return res.send({ error: error });
            }

            res.send({
                foreCast: forCastData,
                location: location,
                address: req.query.address

            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address

    // });
})

app.get('/products', (req, res) => {

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashish',
        errorMessage: 'Help article not found'
    });

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashish',
        errorMessage: 'Page not found'
    });

})
// app.com
// app.com/help
// app.cpm/about

// starts server

app.listen(3000, () => {
    console.log('server is up on port 3000');
})
