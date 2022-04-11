//dependencies
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Board from './Board';
import Card from './Card';

function App() {

  const [ films, setFilms ] = useState([]);

  //get api data
  useEffect(() => {
    axios({
      url:"https://ghibliapi.herokuapp.com/films",
      method:"GET",
      dataResponse:"json",
    }).then(res => {
      //create an array of films
      const cardsAndMatch = res.data

      //cycle through data and push to cardsAndMatch array to make a duplicate of each film
      res.data.map(data => cardsAndMatch.push(data))

      //shuffle array in random order
      const shuffledCard = (arr) => arr.sort(() => 0.5 - Math.random());
      shuffledCard(cardsAndMatch)

      setFilms(cardsAndMatch)
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

  return (
    <div className="App">
      Matching Game
      <Board>
        {_cards}
      </Board>
    </div>
  );
}

export default App;
