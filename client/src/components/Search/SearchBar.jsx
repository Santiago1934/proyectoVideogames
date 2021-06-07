import React, {useState} from "react";
import { filterByGenre, getSearchGame } from "../../actions";
import {connect} from "react-redux";
import { Link, Route } from "react-router-dom";
import "./SearchBar.css"


export function SearchBar (props) {

  const [title, setTitle] = useState("")

  const { Search, changeVerificacion, filterGenre } = props

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
    changeVerificacion()
    filterGenre()
     if(title.trim() !== "")
    Search(title);
  }

  const handleRedir = () => {
    window.location.href = "/";
  } 


  
  return (
    <header className="headerSearch">

      <div className="containerTitle">
        <a href="/" className ="linkTitle "><h4>XGames</h4></a>
      </div> 

      <div className="containerSearch">
       <form onSubmit={(e) =>handleSubmit(e)}>
          <input onChange={(e) => handleChange(e)} className="bar"
          type="text"
          placeholder="Buscar"
         />
        </form>
      </div>
      <div className="links">
        <Route  path="/AddGame"> <Link className="linkAddGames" to="/">Games</Link></Route>
        <Route  exact path="/"> <Link className="linkAddGames" to="/Addgame">Add Game</Link> </Route>
          
      </div>
    </header>
    );
}


const mapDispatchToProps = (dispatch) => {
  return {
    Search: (name) => dispatch(getSearchGame(name)),
    filterByGenre: (genre) => dispatch(filterByGenre(genre)),
  }
}

export default connect (null, mapDispatchToProps)(SearchBar);