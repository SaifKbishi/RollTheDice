import React from 'react';
import Dice from './components/Dice';
import ImagesArr from './components/ImagesArr';
import './components/diceRoll.css';

import "./App.css";

class App extends React.Component{
  state = {
    rollSum: null,
    dice_1_resultVal:null,
    dice_2_resultVal: null,
    player1_playing:1,  //boolean
    player1_CurrentScore:0,
    player2_CurrentScore:0,
  };

  diceRoll = ()=>{
    let dice_1_resultVal= Math.floor(Math.random() * 6) + 1;
    let dice_2_resultVal= Math.floor(Math.random() * 6) + 1;
    let rollSum= dice_1_resultVal + dice_2_resultVal;
    console.log('dice_1_result: ',dice_1_resultVal, ', dice_2_result',dice_2_resultVal);    
    console.log('rollSum ',rollSum);
    this.setState({
      rollSum,
      dice_1_resultVal,
      dice_2_resultVal,
      dice1_Img: ImagesArr[dice_1_resultVal-1],
      dice2_Img: ImagesArr[dice_2_resultVal-1],
    });
  }
  holdCurrentScoee = ()=>{
    console.log('rollSum from holdCurrentScoee ',this.state.rollSum);
    if(this.state.player1_playing){
      console.log('player1_playing');
      this.setState({
        player1_CurrentScore: this.state.player1_CurrentScore + this.state.rollSum,
        player1_playing:0
      });
    }else{
      console.log('player2_playing');
      this.setState({
        player2_CurrentScore: this.state.player2_CurrentScore + this.state.rollSum,
        player1_playing:1
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Dice Roll</h1>
        <div className="buttons">         
          <button className="button" onClick={this.diceRoll}>Roll</button>
          <button className="button" onClick={this.holdCurrentScoee}>Hold</button>             
        </div>
        <div>Player {this.state.player1_playing ? '1' : '2'} is playing</div>
        <div>Dice1: {this.state.dice_1_resultVal}</div>
        <div>Dice2: {this.state.dice_2_resultVal}</div>
        <div>Sum of the dice: {this.state.rollSum}</div>
        <div>player1_CurrentScore: {this.state.player1_CurrentScore}</div>
        <div>player2_CurrentScore: {this.state.player2_CurrentScore}</div>
        <div className="diceImages">
          <Dice image={this.state.dice1_Img}/>
          <Dice image={this.state.dice2_Img}/>
        </div>
      </div>
    );
  }
}

export default App;