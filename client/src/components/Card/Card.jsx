import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  alphabeticalOrder,
  filterByGenre,
  getGames,
  orderByRating,
  filterGamesAdded,
  getGameAdded,
  getSearchGame,
} from "../../actions";
import { Link } from "react-router-dom";
import "./Card.css";
import banner from "../../images/banner.jpg";
import { SearchBar } from "../Search/SearchBar";

export const Card = (props) => {
  const {
    getGame,
    games,
    gameSearch,
    orderByName,
    gameFilter,
    orderByRating,
    filterByGenre,
    next,
    filterGamesAdded,
    getGameAdd,
    gamesAdded,
    Search,
  } = props;

  const [verificacion, setVerificacion] = useState(false);

  const [page, setPage] = useState({
    1: games.slice(0, 8),
    2: [],
    3: [],
    4: [],
    5: [],
  });

  const [numPage, setNumPage] = useState();

  const [actualPage, setActualPage] = useState(5);

  const handlePage = (e) => {
    if (typeof e === "number") {
      var val = e;
    } else {
      var val = e.target.value;
    }
    let nextPage = 8;
    let previousPage = nextPage * val - 8;
    if (gameFilter.length) {
      setPage({ [val]: gameFilter.slice(previousPage, nextPage * val) });
    } else if (gameSearch.length) {
      setPage({ [val]: gameSearch.slice(previousPage, nextPage * val) });
    } else {
      setPage({ [val]: games.slice(previousPage, nextPage * val) });
    }
  };

  const changeGenre = () => {
    filterByGenre("All ---");
  };

  const handleVerificacion = () => {
    setVerificacion(false);
  };

  useEffect(() => {
    console.log(gameSearch.length);
    if (gameSearch.length) {
      page[1] = gameSearch.slice(0, 8);
      setNumPage(Math.ceil(gameSearch.length / 8));
      if (verificacion === false) {
        handlePage(1);
        setVerificacion(true);
      }
    } else if (gameFilter.length) {
      page[1] = gameFilter.slice(0, 8);
      console.log("hola");
      console.log(gameFilter.length);
      setNumPage(Math.ceil(gameFilter.length / 8));
      if (verificacion === false) {
        handlePage(1);
        setVerificacion(true);
      }
    }
    if (games.length < 100) {
      getGame(next);
    }
    if (games.length === 100 && !gameFilter.length && !gameSearch.length) {
      page[1] = games.slice(0, 8);
      setNumPage(Math.ceil(games.length / 8));
    }
  }, [
    page,
    games,
    getGame,
    gameFilter,
    setNumPage,
    handlePage,
    setVerificacion,
    handleVerificacion,
  ]);

  
 

  const setPagination = (num, arr) => {
    while (num > 0) {
      arr.unshift(num);
      num = num - 1;
    }
    return arr;
  };

  let paginas = setPagination(numPage, []);
  console.log(numPage);
  console.log(paginas);

  const generos = [
    "All ---",
    "Action",
    "Indie",
    "Adventure",
    "RPG",
    "Strategy",
    "Casual",
    "Shooter",
    "Puzzle",
    "Arcade",
    "Racing",
    "Sports",
  ];

  return (
    <div className="containerHome">
      <SearchBar
        Search={Search}
        changeVerificacion={handleVerificacion}
        filterGenre={changeGenre}
      />
      <div className="containerBanner">
        <img src={banner} alt="imgnotfound" width="100%"></img>
      </div>

      <div className="containerFilter">
        <div className="filterTitleOne">
          <p>Ordenar por titulo</p>

          <div className="buttonsFilter">
            <button
              className="buttonFilter"
              onClick={() => {
                orderByName(false);
                setVerificacion(false);
              }}
              type="submit"
            >
              {" "}
              A-Z{" "}
            </button>
            <button
              className="buttonFilter"
              onClick={() => {
                orderByName(true);
                setVerificacion(false);
              }}
              type="submit"
            >
              Z-A
            </button>
          </div>
        </div>

        <div className="filterTitle">
          <p>Ordenar por puntuacion</p>
          <div className="buttonsFilter">
            <button
              className="buttonFilter"
              onClick={() => {
                orderByRating(false);
                setVerificacion(false);
              }}
              type="submit"
            >
              {" "}
              Mayor a Menor{" "}
            </button>
            <button
              className="buttonFilter"
              onClick={() => {
                orderByRating(true);
                setVerificacion(false);
              }}
              type="submit"
            >
              {" "}
              Menor a mayor{" "}
            </button>
          </div>
        </div>

        <div className="filter">
          <div className="select">
            <p>Filtrar</p>
            <select
              onChange={(e) => {
                filterByGenre(e.target.value);
                setVerificacion(false);
              }}
              className="filterCategories"
            >
              {generos.map((el, i) => (
                <option className="options" key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {games.length ? (
        <>
          <div className="wrapContainerCard">
            {page[parseInt(Object.keys(page))].map((el, i) => (
              <div className="contenedorCard">
                <Link
                  className="card"
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={`/game/${el.name}`}
                >
                  <div className="border">
                    <div className="contenedorImg">
                      <img
                        className="imgCard"
                        src={el.background_image}
                        alt="imagen no encontrada"
                      />
                    </div>
                  </div>

                  <div className="text">
                    <p className="name">{el.name}</p>

                    <div className="categoriesCard">
                      {el.genres && typeof el.genres[0] === "number"
                        ? generos
                            .slice(0, generos.length - 1)
                            .filter((el, i) => el.genre.find((el) => el === i))
                        : el.genres
                        ? el.genres.map((el, i) => (
                            <span key={i}>{el.name + " "}</span>
                          ))
                        : false}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/*  <div className="containPagination"> */}
          <div className="pagination">
            {actualPage > 5 ? (
              <button
                className="previous"
                onClick={() => {
                  actualPage > 5 ? setActualPage(actualPage - 5) : <></>;
                }}
              >
                Previous
              </button>
            ) : (
              <></>
            )}
            {paginas?.slice(actualPage - 5, actualPage).map((el) => (
              <button
                className="botonesPagi"
                onClick={handlePage}
                value={el}
                key={el}
              >
                {el}
              </button>
            ))}
            {actualPage < 7 && paginas.length > 5 ? (
              <button
                className="previous"
                onClick={() => {
                  actualPage <= 5 ? setActualPage(actualPage + 5) : <></>;
                }}
              >
               Next
              </button>
            ) : (
              <></>
            )}
          </div>
          {/* </div> */}
        </>
      ) : (
        false
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGame: (next, pag) => dispatch(getGames(next, pag)),
    orderByName: (boolean) => dispatch(alphabeticalOrder(boolean)),
    orderByRating: (boolean) => dispatch(orderByRating(boolean)),
    filterByGenre: (genre) => dispatch(filterByGenre(genre)),
    filterGamesAdded: () => dispatch(filterGamesAdded()),
    getGameAdd: () => dispatch(getGameAdded()),
    Search: (name) => dispatch(getSearchGame(name)),
  };
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
    gameSearch: state.gameSearch,
    gameFilter: state.gamesFilter,
    next: state.next,
    genres: state.genres,
    gamesAdded: state.gamesAdded,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
