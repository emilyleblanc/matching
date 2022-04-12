import React from 'react';

const Board = ({children}) => {
   //style to flex wrap cards
   const styles = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      justifyContent: 'space-between',
   }
   return(
      <div className="board-wrapper" style={styles}>
         {children}
      </div>
   )
}

export default Board;