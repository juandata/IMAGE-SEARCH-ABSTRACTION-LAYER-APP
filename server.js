var express = require('express');
var app = express();
var key, cx, theUrl, theQuery;
debugger;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.use("/api/imagesearch/", function(req, res, next){
   key = process.env.KEY, cx = process.env.CX,theUrl = 'https://www.googleapis.com/customsearch/v1?key=' + key + "&cx=" + cx + "&q=",
  theQuery = req.url.split('/')[1];
  res.send(theUrl + theQuery); 
  next();  
},function hey(){
  console.log(theUrl + theQuery);
}
);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
