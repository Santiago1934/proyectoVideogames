const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const server = require("express").Router();
const { Videogame, genregame} = require('../db.js')




var arr =[]
server.get("/myGames", (req, res) => {
    Videogame.findAll().then((results) => {results.map(el => arr.push(el.dataValues))})
    .then(info => res.json(arr))
})




module.exports= server;