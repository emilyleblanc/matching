import React from 'react';

const Board = ({children}) => {
   //style to flex wrap cards
   const styles = {
      display: 'flex',
      flexWrap: 'wrap',
      border: "2px solid black",
   }
   return(
      <div className="board-wrapper" style={styles}>
         {children}
      </div>
   )
}

export default Board;