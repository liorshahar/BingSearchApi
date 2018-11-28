const express = require('express');
const https   = require('https');
const router  = express.Router();
const axios   = require('axios');

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY;
if (!SUBSCRIPTION_KEY) {
  throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
}


function bingSearchQuery(query){
  var params = {
    hostname: 'api.cognitive.microsoft.com',
    path:     '/bing/v7.0/search?q=' + encodeURIComponent(query),
    headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
  }
  return axios.get('https://api.cognitive.microsoft.com/bing/v7.0/search?q=' + encodeURIComponent(query) + '&count=50&offset=0',{
    headers:  { 
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY 
    }
    
  })
  .then(response=>{
    var results = response.data.webPages.value;
    console.log(results);
    return results;
  })
  .catch(err=>{console.log(err)})
     
}


/* GET  shmoogle query */
router.get('/', function(req, res, next) {
  bingSearchQuery('shenkar')
  .then((results)=>{
    res.send(results);
  })
  .catch(err=>{console.log(err)})
});



module.exports = router;
