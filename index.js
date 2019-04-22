module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.IsPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);  

    var app_api_key = GetEnvironmentVariable('WEATHER_API_KEY');
    var yourUrl = "https://api.openweathermap.org/data/2.5/weather?id=2193733&units=metric&appid=" + app_api_key ;

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.responseType = 'json';
    Httpreq.open("GET",yourUrl,false);
    Httpreq.setRequestHeader("Content-Type: application/json");
    Httpreq.send();
    var myObj = JSON.parse(Httpreq.responseText);

    var msg = "Hi Malachi, the wind speed is currently "+ Math.round(myObj.wind.speed * 1.944) + 
    " knots in Auckland. Wind direction is " + myObj.wind.deg + " degrees.";
    
    var mobile_number = GetEnvironmentVariable('PHONE_NUMBER');
    var from_number = GetEnvironmentVariable('TWILIO_NUMBER');

    context.bindings.message = {};

    context.bindings.message = {
        body : msg,
        to : mobile_number,
        from : from_number
    };


    context.done();

};

function GetEnvironmentVariable(name)
{
    return process.env[name];
}