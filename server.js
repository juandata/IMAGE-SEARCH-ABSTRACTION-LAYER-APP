var express = require('express');
var app = express();
debugger;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.use("/api/imagesearch/", function(req, res){
  var key = process.env.KEY, cx = process.env.CX,theUrl = 'https://www.googleapis.com/customsearch/v1?key=' + key + "&cx=" + cx,theQuery = req.url.split('/')[1];
  res.send(theUrl + theQuery); 
  
  //https://www.googleapis.com/customsearch/v1?key=process.env.KEY&cx=&q=lectures

});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
