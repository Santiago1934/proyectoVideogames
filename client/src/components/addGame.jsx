import React, {useState, useEffect} from "react";
import { gamesAdded, getGenres, getGameAdded  } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./addGame.css"




 const validate = (input) => {
        
    
    let errors={};

    if (!input.name.trim()) {
        errors.name="The name of the game is required"
    }
     if(!input.description.trim()){
        errors.description='Description is required'
    }
    if(!Object.keys(input.genres).length < 1){
        errors.genres='You must select at least one genre'
    }
    if(!Object.values(input.plataforms).length < 1){
        errors.plataforms='You must select at least one platform'
    }
    return errors;
}
 
 const AddGame = (props) => {

    const [input, setInput] = useState({
        name:"",
        description: "",
        launch:"",
        rating: "",
        plataforms:{},
        genres:{}
    })

   
    const [error, setError] = useState({});

    const {createGame, getGenre, genreState,  getGameAdd, gamesAdded} = props;

    const {name, description, launch, genres, plataforms} = input

    const genreChange= (e) => {
    const val= e.target.checked;
    const name= e.target.name;
    let updateGenre = {...genres, [name]:val}
        setInput({
            ...input,
            genres: updateGenre,

        })
    }

    const ratingChange= (val) => {
            setInput({
                ...input,
                rating: val,
            })
        }


    useEffect(()=> {
        getGenre()
    }, [getGenre])
    
    const plataformChange= (e) => {
    const val= e.target.checked;
    const name= e.target.name;
    let updatePlataform = {...plataforms, [name]:val}
        setInput({
            ...input,
            plataforms: updatePlataform
        })
    }       
    
    const updateState = (e) => setInput({
        ...input, [e.target.name]: e.target.value});

    
        const updateErrores = e => setError(validate({...input,[e.target.name]: e.target.value})) 
        var flag = true;

    const submit = e => {
        e.preventDefault()
        if(!Object.keys(error).length && name){  
            alert("Tu juego ha sido agregado con exito")      
            createGame(input)
        }
        else{
            if(Object.values(error).length){
                alert(Object.values(error)[0])
            } else {
                alert("The name of the game is required")
        }}
        setInput({
            name:"",
            description: "",
            launch:"",
            rating: "",
            "plataforms":"",
            "genres":""
        })
    }    
 
    const plataform = ["Xbox Series", "PC", "PlayStation","Atari", "Game Boy", "Wii", "Nintendo", "Linux",
    "Android", "iOS","macOS", "PSP", "SEGA"]

    const calificacion = [1, 2, 3, 4, 5]

    return (
        <div className="wrapper">
            <header className="headerSearch">
            <Link className="linkGame " to="/" style={{textDecoration:"none"}}><p className="title">Henry Videogames</p></Link>
            <Link className="linkAddGame"  to="/games">Games</Link>
            </header>
            <form className="form" onSubmit={submit}>
                <div  onChange={updateErrores} >
                    <label>Name of your Videogame</label>
                    <input className="input" style={error.name && {borderColor:"red"}} 
                       type="text"
                       name="name"
                       placeholder={!error.name ? "Name" : error.name} 
                       onChange={updateState}
                       value= {name}
                       
                       />
                </div>
                <div onChange={updateErrores} >
                    <label>When will your game be released?</label>
                    <input className="input"  style={error.launch && {borderColor:"red"}} 
                       type="date"
                       name="launch"
                        placeholder={!error.launch ? "Release Date" : error.launch} 
                       onChange={updateState}
                       value= {launch}
                       
                       />
                </div>
                <div onChange={updateErrores} >
                
                <label>Rating </label>
                <select multiple className="inputRating">
                { calificacion.map( (el, i )=><option key ={i} name={el} onClick={() => ratingChange(el)} value={el}>{el}</option>)}
                </select>
                    
                </div>
                <div style={{marginTop:"8rem"}}>
                <label>Make a brief description of your game</label>
                <div onChange={updateErrores} >
                    <textarea className="area" style={error.description && {borderColor:"red"}} 
                        name="description"
                        placeholder={!error.description ? "Description" : error.description} 
                       onChange={updateState}
                       value= {description}
                    />
                </div>
                </div>
                <div style={{paddingTop: "6rem",display:"block"}}>
                    <label>What genre/ s does your game belong to? </label>
                    <div className="labelContainer">
                    {genreState.length ? genreState.map((el, i) =>{
                        return (
                            <label key={i+1}>
                                {el.nombre}
                                <input  style={{marginRight:"47px", marginTop:"2rem"}}
                                type="checkbox"
                                name={el.id}
                                onChange={(e) => genreChange(e)}
                                value={el}
                                />
                            </label>)
                    }):<></>}
                    </div>
                </div>
                <div style={{paddingTop: "6rem",display:"block"}}>
                    <label>What platform does your game belong to? </label>
                    <div className="labelContainer">
                    {plataform.map((el, i) =>{
                        return (
                            <label key={i+2}>
                                {el}
                                <input key={i} style={{marginRight:"3rem", marginTop:"2rem"}}
                                type="checkbox"
                                name={el}
                                onChange={(e) => plataformChange(e)}
                                value={plataforms[el]}
                                />
                            </label>
                        )
                    })}
                    </div>
                </div>
                <button 
                       className ="input" style={{marginLeft: "27rem", marginBottom:"6rem", marginTop:"4rem"}}
                       type="submit"
                       >Add Game</button>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        createGame: (input) => dispatch(gamesAdded(input)),
        getGenre: () => dispatch(getGenres()),
        getGameAdd: () => dispatch(getGameAdded()),
    }
}

const mapStateToProps = (state) => {
    return {
        genreState: state.genres,
        gamesAdded: state.gamesAdded
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGame);

