var axios = require('axios');
var ejs = require('ejs');

function getAllTickets(req, res) {
  if(req.params.pageNo === undefined)
    req.params.pageNo = 1;

  var config = {
    auth: {
      username: 'bbatanes17@yahoo.com',
      password: process.env.PASSWORD
    }
  };

  axios.get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets.json?page=' + req.params.pageNo + '&per_page=25', config)
    .then(function (response) {
      var lastPage = Math.ceil(response.data.count/25);
      response.data.pageNo = req.params.pageNo;
      response.data.previousBtn = (req.params.pageNo > 1 ? "" : "disabled");
      response.data.nextBtn = (req.params.pageNo < lastPage ? "" : "disabled");
      console.log(response.data);
      console.log(response.status);

      ejs.renderFile('./views/pages/index.ejs', response.data, function(error, result) {
        if(!error) {
          res.status(200).send(result);
        }
        else {
          res.status(404).send('404 Page Not Found');
        }
      });
    })
    .catch(function(error) {
      res.status(400).send('400 Request was unsuccessful');
    });
};

exports.getAllTickets = getAllTickets;
