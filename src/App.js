import React from 'react';
import Dice from './components/Dice';
import ImagesArr from './components/ImagesArr';
import './components/diceRoll.css';
import defaultDice from "./images/Two_red_dice.png";

import "./App.css";

class App extends React.Component{
  state = {
    gameNotStarted:1,
    rollSum: null,
    dice_1_resultVal:null,
    dice_2_resultVal: null,
    player1_playing:1,  //boolean
    player1_CurrentScore:0,
    player2_CurrentScore:0,
    winningScoreValue: 19,
  };

  diceRoll = ()=>{
    this.setState({gameNotStarted:0});
    let dice_1_resultVal= Math.floor(Math.random() * 6) + 1;
    let dice_2_resultVal= Math.floor(Math.random() * 6) + 1;
    let rollSum= dice_1_resultVal + dice_2_resultVal;
    console.log('dice_1_result: ',dice_1_resultVal, ', dice_2_result: ',dice_2_resultVal);    
    console.log('rollSum ',rollSum);
    this.setState({
      rollSum,
      dice_1_resultVal,
      dice_2_resultVal,
      dice1_Img: ImagesArr[dice_1_resultVal-1],
      dice2_Img: ImagesArr[dice_2_resultVal-1],
    });
  }//diceRoll
  
  componentDidUpdate(){
    console.log('componentDidUpdate');
    console.log('dice_1_result: ',this.state.dice_1_resultVal, ', dice_2_result: ',this.state.dice_2_resultVal);
    if(this.state.dice_1_resultVal !== this.state.dice_2_resultVal){
      console.log('dice are NOT equal reset player score')
    }else{
      //check which player is playing and reset his score
      console.log('dice are equal reset player score');
    }

    if(this.state.player1_CurrentScore >= this.state.winningScoreValue){
      console.log('player 1 won');
      //and restart game
      //this.newGame();
    }
    if(this.state.player2_CurrentScore >= this.state.winningScoreValue){
      console.log('player 2 won')
      //and restart game
      //this.newGame();
    }
  }//componentDidUpdate



  holdCurrentScore = ()=>{
    console.log('hold button was clicked')
    if(this.state.dice_1_resultVal != null && this.state.dice_2_resultVal != null){
      console.log('rollSum from holdCurrentScoee ',this.state.rollSum);
      if(this.state.player1_playing){
        console.log('player1_playing');
        this.setState({
          player1_CurrentScore: this.state.player1_CurrentScore + this.state.rollSum,
          player1_playing:0,
          /**prevent using the same results for the other player */
          rollSum: null,
          dice_1_resultVal:null,
          dice_2_resultVal: null,
        });       
      }else{
        console.log('player2_playing');
        this.setState({
          player2_CurrentScore: this.state.player2_CurrentScore + this.state.rollSum,
          player1_playing:1,
          /**prevent using the same results for the other player */
          rollSum: null,
          dice_1_resultVal:null,
          dice_2_resultVal: null,
        });
      }
     
    }else{
      console.log('you should roll the dice before holding reslts')
    }
  }//holdCurrentScoee

  newGame = () =>{
    console.log('lets start a new game');
    this.setState({
      gameNotStarted:0,
      rollSum: null,
      dice_1_resultVal:null,
      dice_2_resultVal: null,
      player1_playing:1,  //boolean
      player1_CurrentScore:0,
      player2_CurrentScore:0,
    });
  }//newGame



  render() {
    return (
      <div className="App">
        <h1>Dice Roll</h1>
        <div className="buttons">         
          <button className="button" onClick={this.diceRoll}>Roll Dice</button>
          <button className="button" onClick={this.holdCurrentScore}>Hold</button>             
          <button className="button" onClick={this.newGame}>New Game</button>             
        </div>
        <input 
          type="text" 
          value={this.state.winningScoreValue}
          onChange={e=> this.setState({winningScoreValue: e.target.value})}
        />
        <div>Player {this.state.player1_playing ? '1' : '2'} is playing</div>
        <div>Dice1: {this.state.dice_1_resultVal}</div>
        <div>Dice2: {this.state.dice_2_resultVal}</div>
        <div>Sum of the dice: {this.state.rollSum}</div>
        <div>player1_CurrentScore: {this.state.player1_CurrentScore}</div>
        <div>player2_CurrentScore: {this.state.player2_CurrentScore}</div>
        <div className="diceDiv">
        {this.state.gameNotStarted ? 
          <img className="dice-image" src={defaultDice} alt="reddice" /> :
          <div className="diceImages">
            <Dice image={this.state.dice1_Img}/>
            <Dice image={this.state.dice2_Img}/>             
          </div>}
        </div>
      </div>
    );
  }
}

export default App;