//dependencies
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

      //make a duplicate of each film
      res.data.map(data => cardsAndMatch.push(data))

      //shuffle films in random order
      cardsAndMatch.sort(() => 0.5 - Math.random())

      //set state of films
      setFilms(cardsAndMatch)
    }
    ).catch(error => console.log(error))
  },[])

  let arrOfSelectedCards = []

  const handleIsSelected = (card) => {
    arrOfSelectedCards.push(card)
    //if 2 cards are selected compare ids to find a match
    if(arrOfSelectedCards.length === 2 && arrOfSelectedCards[0] !== arrOfSelectedCards[1]){
      console.log('2 ids not a match')
      arrOfSelectedCards = []
    }else if(arrOfSelectedCards.length === 2 && arrOfSelectedCards[0] === arrOfSelectedCards[1]){
      console.log('2 ids a match')
      arrOfSelectedCards = []
    }else(
      console.log(' 1 id')
    )
  }


  //if a match increase count (score)

  //not a match set the cards to selected false

  //create card components
  const _cards = films.map((film) => (
  <Card
    key={film.id}
    id={film.id}
    moviePoster={film.image}
    title={film.title}
    handleIsSelected={handleIsSelected}
    />)
  )

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <Board>
        {_cards}
      </Board>
    </div>
  );
}

export default App;
