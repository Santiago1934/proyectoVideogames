const { Router } = require('express');
const Description = require('./description');
const Genres = require("./genres")
const  Home  = require("./home")
const createGame = require("./createGame")
const getGameCreated = require("./getGameCreated")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(`/videogames`, Description)
router.use("/games", createGame)
router.use("/games", getGameCreated)
router.use("/games", Genres)
router.use("/games", Home)//home and search




module.exports = router;
