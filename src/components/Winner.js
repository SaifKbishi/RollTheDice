import React from 'react';
import './css/winner.css';

class Winner extends React.Component{



 render(){      
    return(    
     <div className="winner">
      {this.props.winningPlayer}
      WINNER
     </div>        
    );  
 }
};
export default Winner;

 