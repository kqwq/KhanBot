const fetch = require('node-fetch');
const fs = require("fs")

const { get, post } = require('../src/core.js');
const secondsToUpdate = 10
const queryUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/DOGE-USD'

console.log("bbb")
// https://query1.finance.yahoo.com/v8/finance/chart/DOGE-USD

async function updatePrice() {
  let res = await fetch(queryUrl, { headers: {}, method: "GET" })
  let data = await res.json()
  let marketPrice;
  // fs.writeFileSync("./data.json",(JSON.stringify(data,null,2)))
  
  try {
    marketPrice=(data.chart.result[0].meta.regularMarketPrice);
    console.log(marketPrice)
  }
  catch{
    console.log("Market price not found...")
  }
  
  let output = {
    "DOGE": marketPrice
  }

  post.updateProgram("6301475330277376", JSON.stringify(output),"Dogecoin",400,400,`${process.cwd()}/assets/Dogecoin_Logo.png`)
  // 
}


/*
// Create new program
post.scratchpad("empty code", "Dogecoin").then((r)=>{
  console.log(JSON.stringify(r,null,2))
})*/

updatePrice();
setInterval(updatePrice, 1000 * secondsToUpdate)