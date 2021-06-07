const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const server = require("express").Router();
const { Genre } = require('../db.js')


var flag= true;
var id = 0;
const idKey = () => id = id + 1;

server.get("/genres", (req, res) => {
  if(flag === true) {
    axios.get(`https://api.rawg.io/api/genres?key=097ff575730244b2b1af092c8547e8f1`)
    .then(data => data)
    .then(info => info.data.results.map( el =>
      Genre.create({
          id: idKey(),
          nombre: el.name,
      })
  )), flag=false
  }  
  else if(flag === false) {
    Genre.findAll({
    where: [ ],
  }).then(data => {if(data.length !== 0){return res.json(data)}else{flag=true}})}})


module.exports= server;