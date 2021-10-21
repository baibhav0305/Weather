const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Baibhav Panda",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Baibhav Panda",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Helper Page",
    name: "Baibhav Panda",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello Express!");
// });

// app.get("/help", (req, res) => {
//   res.send("Helper page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1> About page </h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: "Please provide a City name",
    });
  }
  let location = "";

  geocode(req.query.city, (error, data) => {
    if (error) {
      return res.send({ error })
    }
    console.log("~~~~~~~~~~~ GEOLOCATION DETAILS ~~~~~~~~~~~~");
    console.log("Error", error);
    console.log("Data", data);

    location = data.location;

    forecast(req.query.city, (error, data) => {
      if (error) {
        return res.send({ error })
      }
      console.log("~~~~~~~~~~~ WEATHER DETAILS ~~~~~~~~~~~~");
      console.log("Error", error);
      console.log("Data", data);

      res.send({
        forecast: data,
        location,
        city: req.query.city
      })
    });

  });
  // res.send({
  //   forecast: "Raining",
  //   location: "Cuttack",
  //   city: req.query.city,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "HELP ARTICLE NOT FOUND",
    name: "Baibhav Panda",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 PAGE",
    name: "Baibhav Panda",
  });
});

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});
