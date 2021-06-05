import React, {useEffect} from "react";
import  "./Home.css"
import {Link} from "react-router-dom";
import {  getGenres } from "../../actions";
import { connect } from "react-redux";



const Home = (props) => {


    const { getGenre} = props

    useEffect(()=> {
        getGenre()
    }, [getGenre])

    return (
        <div className="portada">
        <header className="headerHome">
            <Link className="linkHome" to="/games">Games</Link>
            <Link className="linkHome" to="/" style={{textDecoration:"none"}}><p className="title">Henry Videogames</p></Link>
            <Link className="linkHome" to="/AddGame">Add a Game</Link>
        </header>
       <img className="imagenHome" src="https://thecouch.world/wp-content/uploads/2020/06/hipertextual-activision-anuncia-crash-bandicoot-4-its-about-time-con-increible-trailer-2020730992.jpeg" alt="img not found"></img>
       <h1>Welcome to Henry Videogames</h1>
       <span>Everything about more than 500 thousand video games at the click of a button</span>
       <p>And the best? Is that you can contribute by adding your own video games</p>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGenre: () => dispatch(getGenres())
    }
}



export default connect(null, mapDispatchToProps)(Home);
