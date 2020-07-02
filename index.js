const startupLog = require('debug')('http');
//const dbLog = require('debug')('app:db');

const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const app = express();
const courses = require('./routes/courses');
const homepage = require('./routes/homepage')
const fundtransfer = require('./routes/fund-transfer');

app.set('view engine', 'pug');
app.set('views', './views');

const logger = require('./logger');
const authenticate = require('./authenticate');
const { urlencoded } = require('express');


app.use(express.json())
app.use(helmet());
app.use('/', homepage);
app.use( '/api/courses', courses);
app.use('/fund-transfer', fundtransfer);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Host Name: ' + config.get('mail.host'));

//app.use( logger);
//app.use( authenticate);
app.use ( express.urlencoded({extended: true}));
app.use( express.static('public'));

app.use(morgan('tiny'));
startupLog('Morgan enabled ...')


//dbLog("Some DB Log...");

const port = process.env.PORT || 3001;
app.listen( port, ()=>console.log(`Listening to ${port}`)); 