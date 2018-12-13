const express = require('express');
const router  = express.Router();
const axios   = require('axios');

const SUBSCRIPTION_KEY = 'ed8cb9f6cda94f1eaf0b6be7e54bd9cf';
if (!SUBSCRIPTION_KEY) {
  throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
}

function bingSearchApi(query){
  console.log(query);
    var resultsArr = [];
    for(var i = 0; i < 100; i++){
      resultsArr.push(bingSearchQuery(query, i))
    }
    return  Promise.all(resultsArr);
}

function bingSearchQuery(query, offset){
  //console.log(encodeURIComponent(query) + '&count=10&offset=' + (offset * 10));
  var query = {
    url:    'https://api.cognitive.microsoft.com/bing/v7.0/search?q=',
    query:   encodeURIComponent(query) + '&count=10&offset=' + (offset * 10),
    headers:{'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
  }
  return axios.get(query.url + query.query, {headers: query.headers})
  .then(response=>{
    var results = response.data.webPages.value;
    return results;
  })
  .catch(err=>{//console.log(err)
  })
     
}


/* GET  shmoogle query */
router.get('/:query', function(req, res, next) {
  console.log(req.params.query);
  bingSearchApi(req.params.query)
  .then((results)=>{
    res.send(results);
  })
  .catch(err=>{//console.log(err)
  })
});



module.exports = router;
