import React, {useState} from 'react';

const Card = ({ id, moviePoster, movieBanner, title, handleIsSelected }) => {

   const [ isSelected, setIsSelected ] = useState(false);
   
   const handleCardSelected = (id) => {
      setIsSelected(!isSelected);
      handleIsSelected(id)
   }

   const styles = {
      button:{
         width:"300px", 
         backgroundColor: 'blue',
         border:'3px solid red',
         padding:'0',
         margin:'.5em 0 .5em 0',
      },
      img:{
         maxWidth:"100%",
         height:"auto"
      }
   }

   return(
      <button key={id} style={styles.button} onClick={() => handleCardSelected(id)}>
         {
            isSelected ? 
            <img style={styles.img} src={moviePoster} alt={title}/>
            : <img style={styles.img} src={movieBanner} alt={title}/>
         }
      </button>
   )
}

export default Card