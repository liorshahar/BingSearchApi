/* 
    This Route is for development only 
*/

const express = require("express");
const router = express.Router();
var obj = require("../resultForDev.json");

/* GET  devRoute */
router.get("/", function(req, res) {
  res.json(obj);
});

module.exports = router;
