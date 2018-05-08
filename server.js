var express = require('express');
var app = express();
var request = require("request");
var key, cx, theUrl, theQuery;
debugger;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.use("/api/imagesearch/", function(req, res, next){
   key = process.env.KEY, cx = process.env.CX,theUrl = 'https://www.googleapis.com/customsearch/v1?key=' + key + "&cx=" + cx + "&q=",
  theQuery = req.url.split('/')[1];
  request(theUrl + theQuery, function(error, response, body) {
  var respinJson = JSON.parse(body);
  var respList = {
  };
  console.log(typeof respinJson);
  res.json(respinJson); 
});
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
