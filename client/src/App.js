import './App.css';
import React from "react";
import SearchBar from "./components/SearchBar"
import Card  from "./components/Card"
import AddGame from "./components/addGame"
import  Home   from "./components/Home";
import { Footer }  from "./components/Footer"
import {Route, Link } from "react-router-dom";
import Description from './components/Description';


function App() {
  return (
    <div className="containerApp">
     <Route exact path="/" component= {Home} ></Route>
      <Route path="/games" component= {SearchBar} ></Route>
      <Route exact path="/addGame" component= {AddGame}></Route>
      <Route exact path="/games" component= {Card} ></Route>
      <Route exact path="/game/:id" component= {Description}></Route>
      <Route path="/" component={Footer}></Route>
      </div>
  );
}

export default App;

/*     //<Route exact path="/videogames" component= {MyGames} ></Route>
*/