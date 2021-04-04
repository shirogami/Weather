
const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29kZS1keW5hbW8iLCJhIjoiY2ttdXgyYnFmMDAwbzJwdWdzendmMjh5aSJ9.in0CcDmGt980s2Le61iV7Q'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location services!!', undefined);
        } else if (response.body.features.length === 0) {
            callback('unable to connnect tp location services', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}


module.exports = geoCode;