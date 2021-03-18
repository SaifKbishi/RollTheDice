import React from 'react';

class Button extends React.Component{
 state={

 };

 render(){
  return(
   <div>
    <button className="btn">{this.props.btnLabel}</button>  
  </div>
  );
 }
};
export default Button;