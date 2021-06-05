import './App.css';
import React from "react";
import Card  from "./components/Card/Card"
import AddGame from "./components/addGame/addGame"
import { Footer }  from "./components/Footer/Footer"
import {Route, Link } from "react-router-dom";
import Description from './components/Description/Description';
import { Helmet } from 'react-helmet'





function App() {
  return (
    <>
    <Helmet>
      <title>XGames</title>
    </Helmet>
    
      <Route exact path="/addGame" component= {AddGame}></Route>
      <Route exact path="/" component= {Card} ></Route>
      <Route exact path="/game/:id" component= {Description}></Route>
      <Route path="/" component={Footer}></Route>
      </>
  );
}

export default App;

/*     //<Route exact path="/videogames" component= {MyGames} ></Route>
*/