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

export const filterByGenre = (payload) => (console.log("desde la action change"),{
    type: "FILTER_GENRE",
    payload
})

export const getGameAdded = (payload) => {
    return function(dispatch) {
        return axios.get("/games/myGames")
        .then(res => res.data) 
        .then(game => dispatch({
            type:"GET_GAME_ADDED", payload: game
        }))
        };
}



export const gamesAdded = (payload) => {

    return function(dispatch) {
        return axios.post("/games/add", payload) 
        .then(game => dispatch({
            type:"GAME_ADDED", payload: game.data
        }))
        };

}

export const getGenres = () => {
    return function(dispatch) {
        return fetch("/games/genres")
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
        return fetch(`https://api.rawg.io/api/games?page_size=25&key=097ff575730244b2b1af092c8547e8f1`)
        .then( data => data.json())
        .then(res => { 
            dispatch({ type: "GET_GAMES",  payload: res.results, next: res.next});
        });
    }}else if(next){ 
        return function(dispatch) {
            return fetch(`${next}`)
            .then( data => data.json())
            .then(res => { 
                dispatch({ type: "GET_GAMES",  payload: res.results, next: res.next});
            });
    }}}
   


export const getSearchGame = (titulo) => {
    return function(dispatch){
        return fetch(`https://api.rawg.io/api/games?search=${titulo}&key=097ff575730244b2b1af092c8547e8f1`)
        .then(response => response.json())
        .then(dis => 
            { dispatch({type: "GET_SEARCH_GAME", payload: dis.results})
    })
}}


export const getDescription = (id) => {
    return function(dispatch) {
      return axios.get(`/videogames/${id}`) 
        .then(response => response.data)
        .then(game => { 
            dispatch({ type: "GET_GAME_DETAIL", payload: game});
        });
    };
}

