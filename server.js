var express = require('express');
var app = express();
debugger;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.use("/api/imagesearch/", function(req, res){
  res.send("hola"); 
  var theUrl = "https://www.googleapis.com/customsearch/v1?key=" + key=process.env.KEY +  "&cx=" + process.env.CX + "&q=lectures"
  console.log(req.url.split('/')[1]);
  
  //https://www.googleapis.com/customsearch/v1?key=process.env.KEY&cx=process.env.CX&q=lectures

});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
