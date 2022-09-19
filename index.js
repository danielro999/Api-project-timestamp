// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*                  ---terminados
--- Un parámetro de fecha vacío debe devolver la hora actual en un objeto JSON con una clave utc


----Una petición para /api/:date? con una fecha válida debe devolver un objeto JSON con una clave unix que es una marca de tiempo Unix de la fecha de entrada en milisegundos (como tipo Número)

let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()

---Una petición para /api/:date? con una fecha válida debe devolver un objeto JSON con una clave utc que es una cadena de la fecha de entrada en el formato: Thu, 01 Jan 1970 00:00:00 GMT

---Una solicitud a /api/1451001600000 debe devolver { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" } 
          new Date(1451001600000);
          resultado = Thu Dec 24 2015 21:00:00 GMT-0300 (hora estándar de Argentina)
          
          Tu proyecto puede manejar fechas que pueden ser analizadas con éxito por new Date(date_string)

Si la fecha de entrada es inválida, la api devuelve un objeto con la estructura { error : "Invalid Date" }

Un parámetro de fecha vacío debe devolver la hora actual en un objeto JSON con una clave unix


*/


// function jsonTime(time)
// {

//   utc = new Date(time);

//   weekDay =  utc.toLocaleDateString('en-US', { weekday: 'short' });
//   const day =  utc.toLocaleDateString('en-US', { day: 'numeric' });
//   const month =  utc.toLocaleDateString('en-US', { month: 'short' });
//   const year =  utc.toLocaleDateString('en-US', { year: 'numeric' });
  
//   const unix = new Date(time).getTime();//Date.now()
  
//   if (day==="Invalid Date" )  jsonT= ({ error : "Invalid Date" });
//   else 
//     jsonT =({"unix":unix , "utc":`${weekDay}, ${day} ${month} ${year} 00:00:00 GMT` });

//   return jsonT;  
// };


function jsonTime(time)
{
  utc = new Date(time); 
  const unix = new Date(time).getTime();
  if (utc.toUTCString()==="Invalid Date")  jsonT= ({ error : "Invalid Date" });
  else jsonT =({"unix":unix , "utc" : utc.toUTCString()});
  return jsonT;  
};


app.get("/api/", (req, res)=>{
  
  dia= new Date();
  horaUnix = dia.getTime();
  horaUtc = dia.toUTCString ();
  res.json({unix:horaUnix, utc:horaUtc})
  
  //  console.log(typeof(unix));
})

app.get("/api/:fecha", (req, res)=>
  {
   // console.log(req.params.fecha); 
   // console.log('tipo de request: '+typeof(req.params.fecha)); 
    
    const fechaURL=req.params.fecha;
  // console.log(typeof(fechaURL));
    if (!isNaN(fechaURL))  fecha= parseInt(fechaURL);
    else  fecha = fechaURL;   
  // console.log(typeof(fecha));
        res.send(jsonTime(fecha)); 
  // console.log(jsonTime(fecha));
  
  })

// 2016-12-25
// 2016-12-25
// 1451001600000
// 05 October 2011, GMT
// this-is-not-a-date