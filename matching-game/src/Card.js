import React from 'react';

const Card = ({ id, moviePoster, title, handleIsSelected }) => {

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
      <button key={id} style={styles.button} onClick={() => handleIsSelected(id)}>
         <img style={styles.img} src={moviePoster} alt={title}/>
      </button>
   )
}

export default Card