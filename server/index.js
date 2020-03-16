var elasticsearch = require('elasticsearch');
const pino = require('express-pino-logger')();


const express = require('express');
// const bodyParser = require('body-parser');


//create an instance of the elasticsearch.Client class
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


//create an instance of the elasticsearch.Client class
var client1 = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


//create an instance of the elasticsearch.Client class
var client2 = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});




//variable to store data from index
var dataFromElastic = null;
var AlldataFromElastic = null;
var SummaryHistoryFromElastic = null;


//variable to store data from index
//var dataFromElastic = null;

//search the index for required document
//match all summery data
client.search({
    index: 'test_data',
    body: {
    query: {
      match: {summery: 'true'}
    	},
      "sort": [
        {"session_start_time": "desc"}     
    ]
  }


}).then(function (resp) {
    //get the document from node's response
    var hits = resp.hits.hits;
    //get only the first data on the index
    dataFromElastic = hits[0]._source;

    //Get all the data! 
    //AllataFromElastic = hits._source;

    //Get all the non summery data!


    //console.log(dataFromElastic);
    //console.log(AllataFromElastic);
}, function (err) {
    console.trace(err.message);
});



//match all non summery data
client1.search({
  index: 'test_data',
  "size": 1000,
  body: {
  query: {
    bool : {
      must_not : {
          match : { summery : 'true' }
      }
    }
  },
  "sort": [
        {"session_start_time": "desc"}     
    ]
}


}).then(function (resp) {
    //get the document from node's response
    var hits = resp.hits.hits;
    //get only the first data on the index
    //dataFromElastic = hits[0]._source;

    //Get all the data! 
    AllDataFromElastic = hits;

    //Get all the non summery data!


    console.log(AllDataFromElastic);
    //console.log(AllataFromElastic);
}, function (err) {
    console.trace(err.message);
});


//summary history data
client.search({
    index: 'test_data',
    body: {
    query: {
      match: {summery: 'true'}
      },
      "sort": [
        {"session_start_time": "desc"}     
    ]
  }
 

}).then(function (resp) {
    //get the document from node's response
    var hits = resp.hits.hits;
    //get only the first data on the index
    //dataFromElastic = hits[0]._source;

    //Get all the data! 
    SummaryHistoryFromElastic = hits;

    //Get all the non summery data!


    console.log(SummaryHistoryFromElastic);
    //console.log(AllataFromElastic);
}, function (err) {
    console.trace(err.message);
});



var app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/elastic', (req, res) => {
  //res.send({ express: JSON.stringify(dataFromElastic) });
  //res.send({ express: dataFromElastic});
  res.send(dataFromElastic);
});


app.get('/api/elastic1', (req, res) => {
  //res.send({ express: JSON.stringify(dataFromElastic) });
  //res.send({ express: dataFromElastic});
  res.send(AllDataFromElastic);
});


app.get('/api/history', (req, res) => {
  //res.send({ express: JSON.stringify(dataFromElastic) });
  //res.send({ express: dataFromElastic});
  res.send(SummaryHistoryFromElastic);
});




app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
