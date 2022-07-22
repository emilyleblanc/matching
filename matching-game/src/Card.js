import React, { useContext, useState } from 'react';
import { Context } from './index';

const Card = ({ id, moviePoster, movieBanner, title, handleIsSelected }) => {

   const handleCardSelected = (id) => {
      handleIsSelected(id)
   }

   const context = useContext(Context)

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
            flipCard ? 
            <img style={styles.img} src={moviePoster} alt={title}/>
            : <img style={styles.img} src={movieBanner} alt={title}/>
         }
      </button>
   )
}

export default Card