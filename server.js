var express = require('express');
var app = express();
var request = require("request");
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var key, cx, theUrl, theQuery;
var address = process.env.SECRET;
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.use("/api/imagesearch/", function(req, res, next){
  theQuery = req.url.split('/')[1];
  var theFinalQuery = theQuery.split('?')[0];
  var term = decodeURI(theFinalQuery);
  var start = theQuery.split('?')[1].split('=')[1];
  key = process.env.KEY, cx = process.env.CX,theUrl = 'https://www.googleapis.com/customsearch/v1?key=' + key + 
  "&cx=" + cx + "&searchType=image" + "&start=" + start + "&q=",
  request(theUrl + theFinalQuery, function(error, response, body) {
  var respinJson = JSON.parse(body);
    //res.send(respinJson);
  var respList = {
  0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 
  };
for(var i=0; i < respinJson.items.length; i ++){
  respList[i].url = respinJson.items[i].link;
  respList[i].snippet = respinJson.items[i].snippet;
  respList[i].thumbnail = respinJson.items[0].image.thumbnailLink;
  respList[i].context = respinJson.items[0].image.contextLink;
} //console.log(respList);  
    res.json(respList);
    /*MongoClient.connect(address, function(err, db) {
    //(Focus on This Variable)
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to mlab.com');
      // do some work here with the database.
      var dbo = db.db("urlshortened");
      dbo.collection('imageSearchHistory').insert(respList, function(err, ok){
        if (err) throw err;
        if (ok) console.log("document inserted ok");
      });
      //Close connection
      db.close();
      //});
    }
  });*/
});
});
app.get("/api/latest/imagesearch/", function(req, res){
  res.send("latest search is");
    
  
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
