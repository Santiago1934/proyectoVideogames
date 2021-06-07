const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;

const Home = (req, res) => {
    if(req.query.search){
    axios.get(`https://api.rawg.io/api/games?search=${req.query.search}&key=097ff575730244b2b1af092c8547e8f1`)
    .then( data => data)
    .then(response => res.send(response.data))
    }
    else {
    axios.get(`https://api.rawg.io/api/games?key=097ff575730244b2b1af092c8547e8f1`)
    .then( data => data)
    .then(response => res.send(response.data))
    }
}

module.exports= Home;