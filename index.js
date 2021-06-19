var https = require('https');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({entended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.post('/', function(req, res){

  const city = req.body.CityName;
  const apiKey = 'ebfe12ffb7f0172592186e3b422d2469';
  const units = 'metric';

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.write('<p>The weather in ' + city + ' is curently ' + weatherDescription +'</p>');
      res.write('<h1>The temperature of ' + city + ' is ' + temp + ' degree Celcius</h1>');
      res.write('<img src=' + imageUrl +'>');
      res.send();

    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node app is working!');
});
