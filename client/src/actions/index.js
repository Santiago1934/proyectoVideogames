import axios from "axios";




export const filterGamesAdded = (payload) => ({
    type: "FILTER_BY_GAME_ADDED",
    payload
})


export const alphabeticalOrder = (payload) => ({
    type: "ORDER_ALPHABETIC",
    payload
})

export const orderByRating = (payload) => ({
    type: "ORDER_RATING",
    payload
})

export const filterByGenre = (payload) => ({
    type: "FILTER_GENRE",
    payload
})

export const getGameAdded = () => {
    return function(dispatch) {
        return axios.get("http://localhost:3001/games/myGames")
        .then(res => res.data) 
        .then(game => dispatch({
            type:"GET_GAME_ADDED", payload: game
        }))
        };

}



export const gamesAdded = (payload) => {

    return function(dispatch) {
        return axios.post("http://localhost:3001/games/add", payload) 
        .then(game => dispatch({
            type:"GAME_ADDED", payload: game.data
        }))
        };

}

export const getGenres = () => {
    return function(dispatch) {
        return fetch("http://localhost:3001/games/genres")
        .then (res => res.json())
        .then ( info => 
            dispatch({type:"GET_GENRES", payload: info})
        )
        };
}


var id = 1;

export const getGames = (next) => {
    if(!next){
    return function(dispatch) {
        return fetch(`https://api.rawg.io/api/games?key=7601e27451504d2cad3aa92b940f4c5c`)
        .then( data => data.json())
        .then(dis => { 
            dispatch({ type: "GET_GAMES",  payload: dis.results, next: dis.next});
        });
    }}else if(next){ 
        id = id + 1
        next = next.substring(0, next.length - 1);
        next = next + id
        return function(dispatch) {
            return fetch(`${next}`)
            .then( data => data.json())
            .then(dis => { 
                dispatch({ type: "GET_GAMES",  payload: dis.results, next: dis.next});
            });
    }}}
   


export const getSearchGame = (titulo) => {
   
    return function(dispatch){
        return fetch(`https://api.rawg.io/api/games?search=${titulo}&key=7601e27451504d2cad3aa92b940f4c5c`)
        .then(response => response.json())
        .then(dis => 
            { dispatch({type: "GET_SEARCH_GAME", payload: dis.results})
    })
}}


export const getDescription = (id) => {
    return function(dispatch) {
      return fetch(`http://localhost:3001/videogames/${id}`) 
        .then(response => response.json())
        .then(game => { 
            dispatch({ type: "GET_GAME_DETAIL", payload: game});
        });
    };
}

