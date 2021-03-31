import React, {useState} from "react";
import { getSearchGame } from "../actions";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css"


export function SearchBar (props) {

  const [title, setTitle] = useState("")

  const { Search } = props

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  
  const handleSubmit= (e) => {
    e.preventDefault();
    if(title.trim() !== "")
    Search(title);
  }


  
  return (
    <header className="headerSearch">
        <Link className ="linkGames "to="/"><p>Henry Videogames</p></Link>
       <form onSubmit={(e) =>handleSubmit(e)}>
        <input onChange={(e) => handleChange(e)} className="bar"
        type="text"
        placeholder="Buscar"
      />
      </form>
      <Link className="linkAddGames" to="/AddGame">Add a Game</Link>
    </header>
    );
}


const mapDispatchToProps = (dispatch) => {
  return {
    Search: (name) => dispatch(getSearchGame(name))
  }
}

export default connect (null, mapDispatchToProps)(SearchBar);