var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");

var http = require('http');
//<add_Requires>

var app = express();

var router = express.Router();

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
// all templates are located in `/views` directory
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var viewPath = __dirname + '/views/';
app.use(express.static('static'));

router.use(function (req,res,next) {
    var log = "{"+"date:"+new Date().toISOString().replace(/T/, '_').replace(/:/g, '-')+",";

    log +=  "md:" + req.method + ",url:'" + req.url+"',";
    log += "rfr:" + req.headers.referer + ",rad:" + req.connection.remoteAddress+"}\n";
    fs.appendFile('accesslog.txt', log, function (err) {
        if (err) throw err;
        //console.log('Saved!');
    });
    next();
});

router.get("/",function(req,res){
    res.render("dadjokes");
});

router.post("/dadjokes",function(req,res){


    var term = req.body.term;
    var page = req.body.page;

    console.log(term);

    const request = require('request');
    var options = {
        url: 'https://icanhazdadjoke.com/search',
        headers: {
            'User-Agent': ' My Library (http:top-shelf.net)',
            'Accept':'application/json'
        },
        qs:{term:term.replace("\n"," "),page:page}
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var respJson = JSON.parse(body);

            console.log(respJson);

            res.end(JSON.stringify(respJson));

        }
    });
});


<!-- <add_services>  -->


app.use("/",router);

app.use("*",function(req,res){
    res.sendFile(__dirname +"/404.html");
    console.log('404 '+ req.baseUrl)
});

http.createServer(app).listen('80');
console.log("Express server listening on port 80");
//<add_listen>



