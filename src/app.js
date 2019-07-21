/**
 * Created by scott on 2019-07-20.
 * DadJokesPortal - connect to icanhazdadjoke and return jokes based on search terms.
 * sets up route to /dadjokes post.
 *
 * accepts;
 * term - word(s) to search by. Seperate by space or newline.
 * page - the gage number to return.
 *
 * exports Express app.
 */
var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");

var app = express();

var router = express.Router();

// bodyParcer plugin to help parcing post body
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// all ejs templates are located in `/views` directory
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../static'));

// All requests are logged in parent folder as accesslog.json
router.use(function (req,res,next) {
    var log = {
            date:new Date().toISOString().replace(/T/, '_').replace(/:/g, '-'),
            md:req.method + ",url:'" + req.url,
            rfr:req.headers.referer,
            rad: req.connection.remoteAddress
        };
    fs.appendFile(__dirname + '/../accesslog.json', JSON.stringify(log)+"\n", function (err) {
        if (err) throw err;
    });
    next();
});

router.get("/",function(req,res){
    res.render("dadjokes");
});

// /dadjokes post route - issues get request to https://icanhazdadjoke.com/search then forwards the response back
router.post("/dadjokes",function(req,res){
    var term = req.body.term;
    var page = req.body.page;

    // create new request. Replace \n with spaces since icanhazdadjoke does not accept \n in request
    const request = require('request');
    var options = {
        url: 'https://icanhazdadjoke.com/search',
        headers: {
            'User-Agent': ' My Library (http:top-shelf.net)',
            'Accept':'application/json'
        },
        qs:{term:term.replace("\n"," "),page:page}
    };

    // attempt connection to icanhazdadjoke.com/search
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var respJson = JSON.parse(body);
            res.json(respJson);
        }else{
            res.end("Error connection to https://icanhazdadjoke.com/search");
        }
    });
});

app.use("/",router);

app.use("*",function(req,res){
    res.render("404");
    console.log('404 '+ req.baseUrl)
});

// provide express app to server
module.exports = app;





