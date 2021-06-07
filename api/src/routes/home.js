const axios = require ("axios");
require('dotenv').config();
const {API_KEY} = process.env;

const Home = (req, res) => {
    if(req.query.search){
    axios.get(`http://api.rawg.io/api/games?search=${req.query.search}&key=${API_KEY}`)
    .then( data => data)
    .then(response => res.send(response.data))
    }
    else {
    axios.get(`http://api.rawg.io/api/games?key=${API_KEY}`)
    .then( data => data)
    .then(response => res.send(response.data))
    }
}

module.exports= Home;