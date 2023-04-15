const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/", function(req, res){
    const query = req.body.cityName;
    const appid = "2044142bdce139671dfdf447c6c81b8d";
    const units = "metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl =  "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription+".</p>");
            res.write("<h1>The Temperature in "+query+" is "+temp+" degree Celcius.</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })
})
app.listen(3000, function(){
    console.log("my server is running on port 3000");
})