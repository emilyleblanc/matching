//dependencies
import { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';

//components
import Board from './Board';
import Card from './Card';
import Score from './Score';


export const GameContext = createContext()

function App() {

  const [ films, setFilms ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ isSelected, setIsSelected ] = useState(false);

  const context = useContext(Context)

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

  //logic to get selected cards
  let arrOfSelectedCards = [];
  
  const handleIsSelected = (card) => {
    
   const selectedFlims =  _cards.filter((film) => card === film.key);
    
    arrOfSelectedCards.push(selectedFlims[0])
    
    if(arrOfSelectedCards.length === 2){
      handleIsMatch()
    }
    return arrOfSelectedCards
  };
  

  //find matches and increase score
    const handleIsMatch = () => {
      console.log(`cardsArr`, arrOfSelectedCards);

      //if 2 cards are selected compare ids to find a match
      if(arrOfSelectedCards[0].key === arrOfSelectedCards[1].key){
        //if a match increase count (score)
        setCount(count + 1)
        console.log(`match`);
        //reset arr to zero
        arrOfSelectedCards = []
  
      }else{

        //reset arr to zero after 5 seconds
        setTimeout(() => {
          console.log("Delayed for 1 second.");
          reSetCards()
        }, "3000")
        
        arrOfSelectedCards= []
      }

    }

    const reSetCards = () => {
      console.log('resert cards to not selected')
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
          />
      )
    }else{
      return(
        <Card
          key={film.id}
          id={`${film.id}-copy`}
          moviePoster={film.image}
          movieBanner={films[0].movie_banner}
          title={film.title}
          handleIsSelected={handleIsSelected}
          />
      )
    }
  }
  )

  return (
    <GameContext.Provider value={{isSelected}}>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <h1>Matching Game</h1>
        <Score count={count} />
        <Board>{_cards}</Board>
      </div>
    </GameContext.Provider>
  );
}

export default App;
