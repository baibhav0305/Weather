const request = require("request");

const forecast = (city, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&appid=a66a2fbc92585f5b946e18c276efb649&units=metric";

  request({ url: url, json: true }, (error, response) => {
    // console.log(response);
    //   console.log(error);

    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.cod === "404") {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        place: response.body.name,
        temperature: response.body.main.temp,
        feels_like: response.body.main.feels_like,
      });
    }
  });
};

module.exports = forecast;
