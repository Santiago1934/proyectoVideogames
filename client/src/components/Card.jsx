import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { alphabeticalOrder, filterByGenre, getGames, orderByRating, filterGamesAdded, getGameAdded} from "../actions";
import { Link } from "react-router-dom";
import  "./Card.css"

const styleContenedor = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: '2rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    filter:'brightness(0.8)'
};

const styleButtonContainer= {
    color: "azure",
    fontSize: "12px",
    height: "100vh",
    float: "left",
    width: "20%"
};

const stylePagination = {
    position: "absolute",
    backgroundColor: "#02131C",
    textAlign: "center",
    bottom: "53px",
    width: "100%",
    height:"100"
}

export const Card = (props) => {
    
    const [contenedorStyle, setContenedorStyle] = useState({});
    const [paginationStyle, setPaginationStyle] = useState({});
    const [buttonContainerStyle, setButtonContainerStyle] = useState({});

    const {  getGame, game, gameSearch, orderByName, gameFilter, orderByRating, 
    filterByGenre, next, filterGamesAdded, getGameAdd, gamesAdded} = props


    const [page, setPage] = useState({
        1:game.slice(0, 16),
        2:[],
        3:[],
        4:[],
        5:[]
    })
    
    const handlePage = (e) => {
        var nextPage = 16;
        const val = e.target.value
        var previousPage = nextPage * val - 16;
        if(val == 7){
            setContenedorStyle(styleContenedor);
            setPaginationStyle(stylePagination)
            setButtonContainerStyle(styleButtonContainer)
            getGameAdd()
        } else {
            setContenedorStyle({});
            setPaginationStyle({});
            setButtonContainerStyle({});
        }
         if(gameFilter.length) {
            setPage({[val] : gameFilter.slice(previousPage, (nextPage * val))})
        }
        else if(gameSearch.length) {
            setPage({[val] : gameSearch.slice(previousPage, (nextPage * val))})
        }
        else {
        setPage({[val] : game.slice(previousPage, (nextPage * val))})
    }}

     
    useEffect(() => {
        if(gameSearch.length){
            page[1] = gameSearch.slice(0, 16)
        }
        else if(gameFilter.length){
            page[1] = gameFilter.slice(0, 16)
        } else {
           page[1] = game.slice(0, 16)
        }
        if(game.length < 80){
            getGame(next)
        }
       
        
    },[page[1], getGame])



    const generos = ["By Default ---","Action", "Indie", "Adventure","RPG", "Strategy","Casual", "Shooter", "Simulation", "Puzzle", "Arcade", 
    "Platformer", "Racing","Sports", "MassiveMultiplayer", "Fighting","Family","BoardGame", "Educational", "Card"]

    const paginas = [1, 2, 3, 4, 5, 6 ,7]
    
   return (
       <>
        <div className="contenedor" style={contenedorStyle}>
            <div  className="buttonContainer" style={buttonContainerStyle}>
                <p>Ordenar por titulo</p>
                <button onClick={() => orderByName(false)}
                type="submit"
                >A-Z</button>
                <button onClick={() => orderByName(true)}
                type="submit"
                >Z-A</button>
    
                
                <p>Ordenar por puntuacion</p>
                <button onClick={() => orderByRating(false)}
                 type="submit"
                >Mayor a Menor</button>

                 <button onClick={() => orderByRating(true)}
                 type="submit"
                >Menor a mayor</button>

            <p>Filtrar</p>
            <select multiple>
                { generos.map( (el, i )=><option key ={i} onClick={() => filterByGenre(el)} value={el}>{el}</option>)}
             </select>               

                <p>Your/us games</p>
                <button onClick={() =>(getGameAdd(), filterGamesAdded())}
                type="submit"
                >Your Games</button>  

                <button onClick={() =>(filterGamesAdded(false))}
                type="submit"
                >Added By Us</button>  
            </div>

            {game.length ? (
                <>
                <div className="contenedorCard">
                {page[parseInt(Object.keys(page))].map((el, i)  => <Link className="card" key={i} style={{textDecoration:"none"}} to={`/game/${el.name}`}> 
                <img style={{borderRadius:"3px"}}src={el.background_image} alt="imagen no encontrada" />
                <div className="text"><p className="text">{el.name}</p>
               {el.genres && typeof el.genres[0] === "number" ? generos.slice(0, generos.length - 1).filter((el, i) => el.genre.find(el => el === i))  
                :el.genres ? el.genres.map((el, i)=> <span key={i}>{el.name+" "}</span>) : <></>}</div></Link>)}
            </div>

            <div className="pagination" style={paginationStyle}>{paginas.map(el => <button className="botonesPagi" onClick={handlePage} value={el} key={el}>{el}</button>)}</div>
                </>
            ) : null}
        </div>
        </>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGame: (next, pag) => dispatch(getGames(next, pag)),
        orderByName: (boolean) => dispatch(alphabeticalOrder(boolean)), 
        orderByRating: (boolean) => dispatch(orderByRating(boolean)),
        filterByGenre: (genre) => dispatch(filterByGenre(genre)),
        filterGamesAdded: () => dispatch(filterGamesAdded()),
        getGameAdd: () => dispatch(getGameAdded()),
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.games,
        gameSearch: state.gameSearch,
        gameFilter: state.gamesFilter,
        next: state.next,
        genres: state.genres,
        gamesAdded: state.gamesAdded

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card)


