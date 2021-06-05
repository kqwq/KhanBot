const get = require('./get.js');
const post = require("./post.js");
const utils = require("./utils.js");
const dotenv = require('dotenv');
dotenv.config()

let KAAS = process.env.KAAS||false;
let fkey = process.env.fkey||"lol";


module.exports = { get, post, utils, KAAS, fkey};