const request = require("request");

const geocode = (city, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(city) +
    ".json?access_token=pk.eyJ1IjoiYmFpYmhhdjAzMDUiLCJhIjoiY2t1emN6ZHc0MnhyaDJ1cXYxcmQxMWQ3ZSJ9.itQ11hfqUtum_zJvYZhHmg";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
