const express = require("express");
const app = express();
(async () => {
    const { get, post, utils } = require('./src/core.js');

    //code goes here
    
})();


app.get("/", (req, res) => {
  res.send("AutoKhan bot Up and Running")
})
app.listen(8080);