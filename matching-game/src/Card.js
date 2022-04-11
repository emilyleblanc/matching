import React, { useState } from 'react';

const Card = ({ key, moviePoster, title }) => {

   const [ isSelected, setIsSelected ] = useState(false)

   const styles = {
      button:{
         width:"10%",
         height:"auto",
      },
      img:{
         maxWidth:"100%",
         height:"auto"
      }
   }

   return(
      <button id={key} style={styles.button} onClick={() => { setIsSelected(!isSelected)} }>
         <img style={styles.img} src={moviePoster} alt={title}/>
      </button>
   )
}

export default Card;