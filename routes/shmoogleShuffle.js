/* Shmoogle Shuffle resulte route
  GET request - http://HOSTNAME/shmoogleShuffle/:query
  return first 100 results shuffle
*/


const express = require('express');
const router  = express.Router();
const axios   = require('axios');
var _         = require('underscore');

// TODO - Hide key in env variable on the server
const SUBSCRIPTION_KEY = '6646472233094e85811b53459f2ffdad';
if (!SUBSCRIPTION_KEY) {
  throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
}


async function bingSearchQuery(query, offset){
  var query = {
    url:    'https://api.cognitive.microsoft.com/bing/v7.0/search?q=',
    query:   encodeURIComponent(query) + '&count=50&offset=',
    headers:{'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
  }
  
  return new Promise((resulve, reject)=>{
    let query1 = axios.get(query.url + query.query + 0, {headers: query.headers})
    let query2 = axios.get(query.url + query.query + 50, {headers: query.headers})
    let queryResultArray = [];
    Promise.all([query1,query2])
    .then(responseArray=>{
      responseArray.forEach((element)=>{
        queryResultArray.push(element.data.webPages.value);
      })
      let returnShuffleArray = _.shuffle(queryResultArray[0]);
      resulve(returnShuffleArray)
    })
  })
}


/* GET  shmoogleShuffle/:query */
router.get('/:query', async function(req, res) {
  console.log(req.params.query);
  var results = await bingSearchQuery(req.params.query)
  res.send(results);
});

module.exports = router;
