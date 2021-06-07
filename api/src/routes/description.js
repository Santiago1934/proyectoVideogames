const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const server = require("express").Router();
const { Videogame, genregame} = require('../db.js')

var obj = {}
var arr =[]

server.get("/:id", (req, res) => {
    if(req.params.id[0] === "s"){
        Videogame.findOne({where: { id: req.params.id}}).then((results) => { 
            obj.name = results.dataValues.name
            obj.rating = results.dataValues.rating
            obj.description = results.dataValues.description
            obj.launch = results.dataValues.launch
            obj.plataforms = results.dataValues.plataforms
    })
        genregame.findAll({where:{videogameId: req.params.id }}).then((results) => {results.map(el => arr.push(el.genreId))})
        .then(info => {obj.genre = arr})
        .then(response => res.json(obj))
        
    }
    else {
    axios.get(`https://api.rawg.io/api/games/${req.params.id}?key=097ff575730244b2b1af092c8547e8f1`)
    .then( data => data)
    .then(response => {
                       obj.name = response.data.name
                       obj.description = response.data.description_raw
                       obj.launch = response.data.released
                       obj.image = response.data.background_image
                       obj.imageAdi = response.data.background_image_additional
                       obj.rating = response.data.rating
                       obj.plataforms = response.data.platforms
                       obj.genre = response.data.genres
                       obj.associate= response.data.tags
                    }).then(info => res.json(obj))
}})

module.exports= server;

//results.map(el => el.dataValues))
//.then(info => res.json(info))