const express = require("express");
const router = express.Router();
var request = require('request');

router.get("/:keyword", async (req, res) => {
  console.log("get request with keyword " + req.params.keyword);
  var keyword = req.params.keyword;
  var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=${keyword}`;
  request({
    uri: url
  }).pipe(res);
});

module.exports = router;
