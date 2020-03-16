const express = require('express');
const bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
const pino = require('express-pino-logger')();


//create an instance of the elasticsearch.Client class
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


//check Elastic node availability
client.ping({
    requestTimeout: 30000
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


//variable to store data from index
var dataFromElastic = null;


//search the index for required document
//match all summery data
client.search({
    index: 'test_data',
    body: {
    query: {
      match: {summery: 'true'}
    	}
      }

}).then(function (resp) {
    //get the document from node's response
    var hits = resp.hits.hits;
    //get only the first data on the index
    dataFromElastic = hits[0]._source;

    //Get all the data! 
    //dataFromElastic = hits;

    //Get all the non summery data!


    console.log(dataFromElastic);



}, function (err) {
    console.trace(err.message);
});

// Creates server instance
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res, next) => {
  const name = req.query.name || dataFromElastic;

  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();

  res.setHeader('Content-Type', 'application/json');
  //res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  res.send(JSON.stringify(name));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
