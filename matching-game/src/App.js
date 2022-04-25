//dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';

//components
import Board from './Board';
import Card from './Card';
import Score from './Score';

function App() {

  const [ films, setFilms ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ isMatch, setIsMatch] = useState(false);
  
  //get api data
  useEffect(() => {
    axios({
      url:"https://ghibliapi.herokuapp.com/films?limit=10",
      method:"GET",
      dataResponse:"json",
    }).then(res => {

      //create an array of films + duplicate
      const cardsAndMatch = [...res.data,...res.data]

      //shuffle films in random order
      cardsAndMatch.sort(() => 0.5 - Math.random())

      //set state of films
      setFilms(cardsAndMatch)
    }
    ).catch(error => console.log(error))
  },[])

  //logic to get selected cards and find matches
  let arrOfSelectedCards = []

  const handleIsSelected = (card) => {

    arrOfSelectedCards.push(card)
    
    //if 2 cards are selected compare ids to find a match
    if(arrOfSelectedCards.length === 2 && arrOfSelectedCards[0] === `${arrOfSelectedCards[1]}-copy`){
      //if a match increase count (score)
      setCount(count + 1)
      //set match to true
      setIsMatch(true)
      //reset arr to zero
      arrOfSelectedCards = []

    }else if(arrOfSelectedCards.length === 2 && `${arrOfSelectedCards[0]}-copy` === arrOfSelectedCards[1] ){
      //if a match increase count (score)
      setCount(count + 1)
      //set match to true
      setIsMatch(true)
      //reset arr to zero
      arrOfSelectedCards = []

    }else if(arrOfSelectedCards.length === 2){

      arrOfSelectedCards = []

    }
    console.log(arrOfSelectedCards)
  }


  //create card components
  const _cards = films.map((film,index) => {
    if(films.indexOf(film) === index){
      return(
        <Card
          key={film.id}
          id={film.id}
          moviePoster={film.image}
          movieBanner={films[0].movie_banner}
          title={film.title}
          handleIsSelected={handleIsSelected}
          isMatch={isMatch}
          selectedCardsArrLength={arrOfSelectedCards.length}
          />
      )
    }else{
      return(
        <Card
          key={`${film.id}-copy`}
          id={`${film.id}-copy`}
          moviePoster={film.image}
          movieBanner={films[0].movie_banner}
          title={film.title}
          handleIsSelected={handleIsSelected}
          isMatch={isMatch}
          selectedCardsArrLength={arrOfSelectedCards.length}
          />
      )
    }
  }
  )

  return (
    <div className="App" style={{display:"flex", alignItems:"center", flexDirection:'column', boxSizing:'border-box'}}>
      <h1>Matching Game</h1>

      <Score
        count={count}/>
      <Board>
        {_cards}
      </Board>
    </div>
  );
}

export default App;
