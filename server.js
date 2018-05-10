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
app.use("/api/imagesearch/", function(req, res){
  theQuery = req.url.split('/')[1];
  var theFinalQuery = theQuery.split('?')[0];
  var term = decodeURI(theFinalQuery);
  var date = new Date();
  var dateReadable = date.toDateString();
  var hour = date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
  var start = theQuery.split('?')[1].split('=')[1];
  key = process.env.KEY, cx = process.env.CX,theUrl = 'https://www.googleapis.com/customsearch/v1?key=' + key + 
  "&cx=" + cx + "&searchType=image" + "&start=" + start + "&q=",
  request(theUrl + theFinalQuery, function(error, response, body) {
    if (error) throw error;
    var respinJson = JSON.parse(body);
  var respList = {
  0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 
  };
  var historyLog = {
    "term": term,
    "when": dateReadable + " at: " + hour
  };
for(var i=0; i < respinJson.items.length; i ++){
  respList[i].url = respinJson.items[i].link;
  respList[i].snippet = respinJson.items[i].snippet;
  respList[i].thumbnail = respinJson.items[0].image.thumbnailLink;
  respList[i].context = respinJson.items[0].image.contextLink;
} 
    res.json(respList);
    MongoClient.connect(address, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to mlab.com');
      // do some work here with the database.
      var dbo = db.db("urlshortened");
      dbo.collection('imageSearchHistory').insert(historyLog, function(err, ok){
        if (err) throw err;
        if (ok) console.log("document inserted ok")
        console.log(historyLog);
      });
      db.close();
    }
  });
  
});
});
app.get("/api/latest/imagesearch/", function(req, res){
  var latestSearch = {
  0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 
  };
   MongoClient.connect(address, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to mlab.com');
      // do some work here with the database.
      var dbo = db.db("urlshortened");
    dbo.collection("imageSearchHistory").find().limit(10).sort({_id : -1}).project({_id : 0}).toArray(function(err, result){
      console.log(result.length);
      for(var i =0; i < result.length; i ++){
        latestSearch[i].term = result[i].term;
        latestSearch[i].when = result[i].when;
      }
       res.json(latestSearch);
  });
      db.close();
    }
  });  
  
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
 