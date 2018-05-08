var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
    console.log("HEY");
  response.sendFile(__dirname + '/views/index.html');
});
app.use("api/imagesearch/", function(req, res){
  console.log("HEY");
  res.send("hola");
  
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
