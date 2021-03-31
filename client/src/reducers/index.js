import { gamesAdded } from "../actions";

const initialState = {
    games: [],
    gameSearch: [],
    gameDetail: {},
    gamesAdded: [],
    genres: false,
    gamesFilter: [],
    next: "",
}

export const rootReducer =(state = initialState, action) => {
    switch(action.type){
        case "GET_GAMES":
            return {
                ...state,
                games: state.games.concat(action.payload),
                next: action.next,
                gameSearch:[],
                gamesFilter:[]
            }
        case "ORDER_ALPHABETIC":
             if(state.gamesFilter.length){
                return {
                    ...state,
                    gamesFilter: state.gamesFilter.slice().sort((o1,o2) => {
                        if(action.payload === true){
                        if (o1.name.toUpperCase() > o2.name.toUpperCase()) { 
                          return 1;
                        } else if (o1.name.toUpperCase() < o2.name.toUpperCase()) {
                          return -1;
                        } 
                        return 0;
                    } else {
                        if (o1.name.toUpperCase() < o2.name.toUpperCase()) { 
                            return 1;
                          } else if (o1.name.toUpperCase() > o2.name.toUpperCase()) {
                            return -1;
                          } 
                          return 0;
                    }})
                }
            }
            else {
            return {
                ...state,
                gamesFilter: state.games.slice().sort((o1,o2) => {
                    if(action.payload === true) {
                    if (o1.name.toUpperCase() < o2.name.toUpperCase()) { 
                      return 1;
                    } else if (o1.name.toUpperCase() > o2.name.toUpperCase()) {
                      return -1;
                    } 
                    return 0;
                } else {
                    if (o1.name.toUpperCase() > o2.name.toUpperCase()) { 
                        return 1;
                      } else if (o1.name.toUpperCase() < o2.name.toUpperCase()) {
                        return -1;
                      } 
                      return 0;
                }})
            }}

        case "ORDER_RATING":
            if(state.gamesFilter.length){
                return {
                        ...state,
                        gamesFilter: state.gamesFilter.slice().sort((o1,o2) => {
                            if(action.payload === true){
                                if (o1.rating > o2.rating) { 
                                     return 1;
                            } else if (o1.rating < o2.rating) {
                                    return -1;
                                } 
                            return 0;
                            }else {
                                if (o1.rating < o2.rating) { 
                                    return 1;
                                } else if (o1.rating > o2.rating) {
                                    return -1;
                                } 
                            return 0;
                            }})
                }
            } else {
                return {
                    ...state,
                    gamesFilter: state.games.slice().sort((o1,o2) => {
                        if(action.payload === true){
                            if (o1.rating > o2.rating) { 
                                return 1;
                        } else if (o1.rating < o2.rating) {
                            return -1;
                        } 
                            return 0;
                        } else {
                                if (o1.rating < o2.rating) { 
                                    return 1;
                                } else if (o1.rating > o2.rating) {
                                    return -1;
                                } 
                            return 0;
                        }})
                }}



        case "FILTER_GENRE": 
                 return{
                    ...state,
                    gamesFilter: action.payload !== "By Default ---" ? state.games.slice(0, state.games.length - 1)
                    .filter(el => el.genres && el.genres.length ? el.genres.find(el => el.name === action.payload) : <></>):
                    [],
                    gameSearch:[]
                }


        case "FILTER_BY_GAME_ADDED":
            if(action.payload === false) {
                return {
                    ...state,
                    gamesFilter: state.games.slice(0, state.games.length - 1).filter(el => el.id[0] !== "s")
                }
            } else {
                return {
                    ...state,
                    gamesFilter: state.games.slice(0, state.games.length - 1).filter(el => el.id[0] === "s")
                }}

         case "GET_SEARCH_GAME": 
                return {
                    ...state,
                gameSearch: action.payload ? action.payload : [],
                gamesFilter: []
            };

        case "GAME_ADDED": 
            return {
                ...state,
            gamesAdded: action.payload
        };



        case "GET_GAME_DETAIL" :
            return {
                ...state,
                gameDetail: action.payload
            };

        case "GET_GAME_ADDED":
            return {
                ...state,
                gamesFilter:  state.games.slice(0, state.games.length - 1).filter(el => {var index = el ; action.payload.find(el => el.id === index)})
                 !== undefined  ? state.gamesFilter.concat(action.payload) : <></> 
            }



        case "GET_GENRES":
            return {
               ...state,
                genres: action.payload
            }



        default:
            return state; 
        
    }
}


