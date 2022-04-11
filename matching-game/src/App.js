//dependencies
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Board from './Board';
import Card from './Card';

function App() {

  const [ films, setFilms ] = useState([]);

  const filmCopy = [...films]

  //get api data
  useEffect(() => {
    axios({
      url:"https://ghibliapi.herokuapp.com/films",
      method:"GET",
      dataResponse:"json",
    }).then(res => {
      setFilms(res.data);
      console.log(res.data)
    }
    ).catch(error => console.log(error))
  },[])

  const _cards = films.map((film) => (
  <Card
    key={film.id}
    moviePoster={film.image}
    title={film.title}
    />)
  )

  const _matchingCards = filmCopy.map((film) => (
    <Card
    key={film.id}
    moviePoster={film.image}
    title={film.title}
    />
  ))


  return (
    <div className="App">
      Matching Game
      <Board>
        {_cards}
        {_matchingCards}
      </Board>
    </div>
  );
}

export default App;
