import React,{useState,useEffect} from 'react';
import MovieList from './components/MovieList';
import MovieHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox';
import Favorites from './components/Favorites';
import RemoveFavourites from './components/RemoveFavourites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// const apiKey = process.env.REACT_APP_API_KEY}

function App() {
 
  const [movies, setMovies] = useState([]);
  const [search,setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);


const getMovie = async (search) => {
  const url =` http://www.omdbapi.com/?s=${search}&apikey=f7962725`

  const response = await fetch(url);
  const responseJson = await response.json();
  if(responseJson.Search){

    setMovies(responseJson.Search);

  }

}
const addFavouriteMovie= (movie) => {

const newFavourites = [...favourites, movie];

setFavourites(newFavourites);

saveToLocalStorage(newFavourites);
}

const removeFavouriteMovie = (movie) => {

const newFavourites = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID)

setFavourites(newFavourites);

saveToLocalStorage(newFavourites);

}

useEffect(()=>{

  getMovie(search);

},[search])

useEffect(() => {

  const movieFavourites = JSON.parse(localStorage.getItem('movie-app-favourites')
  );

    if (movieFavourites){
      setFavourites(movieFavourites);
      }

}, []);

  const saveToLocalStorage = (items) => {
      localStorage.setItem('movie-app-favourites',JSON.stringify(items))
      } 


  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieHeading heading="Movies"/>
          <SearchBox search={search} setSearch={setSearch}/>
    </div>
    <div className="row">
     
     <MovieList movies={movies} 
     handleFavourites={addFavouriteMovie} 
     favouriteComponent={Favorites}/>

     </div>

     <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieHeading heading="Favourites"/>
  </div>
 
      <div className="row">
             <MovieList 
                 movies={favourites} 
                handleFavourites={removeFavouriteMovie} 
                favouriteComponent={RemoveFavourites}/>
          </div>
    </div>
  );
}

export default App;
