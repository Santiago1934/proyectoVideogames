import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { getDescription } from "../../actions";
import "./Description.css"


const generos = ["By Default ---","Action", "Indie", "Adventure","RPG", "Strategy","Casual", "Shooter", "Simulation", "Puzzle", "Arcade", 
    "Platformer", "Racing","Sports", "MassiveMultiplayer", "Fighting","Family","BoardGame", "Educational", "Card"]




const Description = (props) => {
    
    const [gameState, setGameState] = useState("")

    const handleGame = () => {
        setGameState(props.match.params.id)
    }

    
    const {gameDetail, detail, games, gameSearch, gameFilter} = props

    var data=  games.filter(el => el.name === gameState) || gameFilter.filter(el => el.name === gameState) 
    
    
    

    useEffect(() => {

        handleGame()
        if(data[0]){
          return  gameDetail(data[0].id)
        }else {
           data = gameSearch.filter(el => el.name === gameState)
           data[0] ? gameDetail(data[0].id) : <p></p>
        }
    },[gameDetail, gameState])

    var id = 0;
    const idKey = () => id = id +1;
    
    return (
        <div className="contains">

            <div className="headerDescription">
                <Link className="titleDescription " to="/" style={{textDecoration:"none"}}>XGames</Link>
            </div>

        <div className="containerInfo">

            <div className="containerImgDescription">

                <img className="imagen" src={detail.image ? detail.image : "https://lh3.googleusercontent.com/S2r9QoTmnX43lLk7L0cOW6is-w-5ONswpXXi5GaxjLovGMdOaMwYk9ZBB9RqWHPW16ya=s170"} 
                height="100%" width="100%" alt="not found"></img>

                <img className="imagen" src={detail.imageAdi ? detail.imageAdi : "https://lh3.googleusercontent.com/S2r9QoTmnX43lLk7L0cOW6is-w-5ONswpXXi5GaxjLovGMdOaMwYk9ZBB9RqWHPW16ya=s170"} 
                height="100%"width="100%" alt="not found"></img>

            </div>
            
            <div className="info">
                <h1 className="titleName">{detail.name}</h1>
                <h5 className="borderr">Fecha de lanzamiento:<span style={{fontWeight:"400", marginLeft:"1rem"}}>{detail.launch ? detail.launch.slice(0,10): <></>}</span></h5>
                <h5 className="borderr">Rating:<span style={{fontWeight:"400", marginLeft:"1rem"}}>{detail.rating}</span></h5>
                
                <div className="containePlatforms">
                     <h5 className="borderr"> Genero / s</h5>
                
                     <div  className="platforms">{detail.genre && typeof detail.genre[0] === "number" ?  generos.slice(0, generos.length - 1).filter((el, i) => detail.genre.find(el => el === i)) :
                         detail.genre ? detail.genre.map(el => <span style={{margin:"5px", marginLeft:"0"}} key={idKey()} > {el.name} </span>): <p></p>}</div>
                
                </div>

                <div className="containerPlatforms">
                    <h5 className="borderr" >Plataforma / s</h5>
                    <div >{detail.plataforms ? detail.plataforms.map(el => <span style={{margin:"5px", marginLeft:"0"}} key={idKey()} > {el.platform ? el.platform.name : el}</span>): <p></p>}</div>
                </div>

                <h5 className="borderr" >Descripcion</h5>
                <p className="description" style={{marginTop:"2px",  width: "80%"}}>{detail.description}</p>
                
            </div>
        
            </div>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        gameDetail: (id) => dispatch(getDescription(id))
    }
}

const mapStateToProps = (state) => {
    return {
        games : state.games,
        gameSearch: state.gameSearch,
        detail: state.gameDetail,
        gameFilter: state.gamesFilter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)