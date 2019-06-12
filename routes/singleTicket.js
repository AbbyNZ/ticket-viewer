var axios = require ('axios');
var ejs = require('ejs');

function singleTicket(req, res) {
  var config = {
    auth: {
      username: 'bbatanes17@yahoo.com',
      password: process.env.PASSWORD
    }
  };

  axios.get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets/' + req.params.ticketId, config)
    .then(function(response) {
      console.log(response.data);
      ejs.renderFile('./views/pages/tickets.ejs', response.data, function(error, result) {
        if (!error) {
          res.status(200).send(result);
        }
        else {
          res.status(404).send('404 Page Not Found');
        }
      });
    })
    .catch(function(error) {
      res.status(400).send('400 Invalid Request or API not Available');
    });
};

exports.singleTicket = singleTicket;
