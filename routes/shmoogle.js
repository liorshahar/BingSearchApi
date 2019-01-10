/* This route is not for use.... */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
var _ = require("underscore");
const SUBSCRIPTION_KEY = process.env.SUBSCRIPTION_KEY;
if (!SUBSCRIPTION_KEY) {
  throw new Error("AZURE_SUBSCRIPTION_KEY is not set.");
}

async function bingSearchApi(query) {
  console.log(query);
  var resultsArr = [];
  for (let i = 0; i < 10; i++) {
    let t = await bingSearchQuery(query, i)
      .then(resArray => {
        resArray.forEach(element => {
          resultsArr.push(element);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  //console.log(resultsArr)
  return _.shuffle(resultsArr);
}

async function bingSearchQuery(query, offset) {
  var query = {
    url: "https://api.cognitive.microsoft.com/bing/v7.0/search?q=",
    query: encodeURIComponent(query) + "&count=10&offset=" + offset * 10,
    headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY }
  };
  let response = await axios.get(query.url + query.query, {
    headers: query.headers
  });
  console.log(response.data.webPages.value.length);
  return response.data.webPages.value;
}

/* GET  shmoogle query */
router.get("/:query", async function(req, res) {
  console.log(req.params.query);
  var results = await bingSearchApi(req.params.query);
  res.send(results);
});

module.exports = router;
