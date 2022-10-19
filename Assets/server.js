//Array
const express = require("express");
const path = require("path")
const fs = require("fs")
const util = require("util")

//Processes 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

// Server setup
const app = express();
const PORT = process.env.PORT || 8000;
app.use (express.urlencoded({extended:true}));
app.use(express.json());