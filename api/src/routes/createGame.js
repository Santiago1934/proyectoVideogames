const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const server = require("express").Router();
const { Videogame, Genre } = require('../db.js')

var id = 0;
const idKey = () => id = id + 1;

var flag= false;
var array = ["action", "shooter"]


    

server.post("/add", (req, res) => {
    const {plataforms, genres} = req.body
    console.log("estoy agregando el juego")
  
    const plataform = Object.keys(plataforms);
    //Arreglo con los nombres de los generos que tiene el juego
    for(const key in genres){
        if(genres[key] === false){
           delete genres[key]
        }} 
    
    Videogame.create({
        id: "s" + idKey(),
        name: req.body.name,
        description: req.body.description,
        launch: req.body.launch,
        rating: req.body.rating,
        plataforms: plataform,
    }).then(gameCreated => {
        gameCreated.addGenre(Object.keys(genres).map (el => Number(el)))
    }).then(response => res.send(false))
})


module.exports = server;



