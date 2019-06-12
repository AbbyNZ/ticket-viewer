var express = require('express');
var server = express();
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var morgan = require('morgan');

var port = process.env.PORT || 3000;
require('dotenv').config();

// adding Helmet to enhance API's security
server.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// enabling CORS for all requests
server.use(cors());

// adding morgan to log HTTP requests
server.use(morgan('combined'));

var staticAssets = express.static('public');
server.use(staticAssets);

server.set('view engine', 'ejs');
//server.set('views', __dirname + '/views');

var getAllTickets = require('./routes/tickets.js').getAllTickets;
var singleTicket = require('./routes/singleTicket.js').singleTicket;

server.use('/:pageNo', getAllTickets);
server.use('/', getAllTickets);
server.use('/ticket/:ticketId', singleTicket);

// get the index page
/*server.get('/', function(request, response) {
  var tickets = getAllTickets();
  response.render('pages/index', { tickets: tickets });
});*/

// get the singleTicket pages
/*server.get('/ticket', function(request, response) {
  var singleTicket = singleTicket();
  response.render('pages/tickets', { singleTicket: singleTicket });
});*/

http.createServer(server).listen(port, () => {
  console.log(`Server is running on port ${port}.` );
});

module.exports = server;
