import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import session from 'express-session';
import fileupload from 'express-fileupload';

/** */
import SERVER_CONFIG from './configs/server_config.json';
import routers from './src/routers/index';

/** */
var app=express();

/**config MiddleAware */
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(expressValidator());
app.use(flash());
app.use(fileupload());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use(function(req, res, next){
	res.locals.success_message = req.flash('success_message');
	res.locals.error_message = req.flash('error_message');
	res.locals.error = req.flash('error');
	res.locals.errors = req.flash('errors');
	res.locals.user = req.user || null;
  	next();
});

app.use('/', routers);


/** */
var server=app.listen(SERVER_CONFIG.server_port,()=>{
    console.log(`Server running at http://${SERVER_CONFIG.server_ip}:${server.address().port}/`);
});