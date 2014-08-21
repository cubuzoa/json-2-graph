var fs                 = require('fs');
var express            = require('express');
var morgan             = require('morgan');
var bodyParser         = require('body-parser');
var methodOverride     = require('method-override');
var app                = express();

app.use(express.static(__dirname + '/public')); 
var ejsEngine = require('ejs').__express;
app.engine('.ejs', ejsEngine);
app.set('view engine', 'ejs');
app.set('views',__dirname + '/public/views');
app.use(morgan('dev')); 					
app.use(bodyParser()); 						
app.use(methodOverride()); 	

// Register Controllers
var controllerPath = __dirname + "/controllers";
fs.readdirSync( controllerPath ).forEach( function ( file ) {
    if ( ~file.indexOf( "Controller.js" ) ) require( controllerPath + "/" + file )( app );
});

app.listen(process.env.PORT);	
console.log('Magic happens on port 8080'); 