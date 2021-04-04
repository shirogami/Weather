const request = require('request');

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=816758f2762feb49b7a2c1830537fb5f&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect weather services', undefined);
        } else if (response.body.error) { // 
            callback('unable to find location', undefined);
        } else {
            //console.log(response.body.current.humidity);
            callback(undefined, response.body.current.weather_descriptions[0] + ', Temperature is ' + response.body.current.temperature + ', Humidity is ' + response.body.current.humidity + '%');
        }
    })

}

module.exports = foreCast;