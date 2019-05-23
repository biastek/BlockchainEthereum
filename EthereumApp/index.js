import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import fileupload from 'express-fileupload';

/** */
import server_config from './config/server_config.json';
import controller from './src/controllers/index';



/** */
const app=express();

/**config middleware */
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator());
app.use(flash());
app.use(fileupload());

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

app.use('/', controller);


/** server */
var server=app.listen(server_config.server_port,()=>{console.log("Listening on port: "+server.address().port)});