import React from 'react';
import Dice from './components/Dice';
import ImagesArr from './components/ImagesArr';
import Winner from './components/Winner';

import defaultDice from "./images/Two_red_dice.png";
import './components/diceRoll.css';
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
    player1_winner:0,
    player2_winner:0,
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
    if(this.state.dice_1_resultVal === 6 && this.state.dice_2_resultVal ===6){//if dice are not equal to 6
      console.log('dice are  equal reset player score');
       if(this.state.player1_playing === 1){//if player 1 is playing
        console.log('player1_playing');
         this.setState({          
          player1_playing:0,
          player1_CurrentScore:0,
          rollSum: null,
          dice_1_resultVal:null,
          dice_2_resultVal: null,
        });
      }else if(this.state.player1_playing === 0){//if player 2 is playing
        console.log('player2_playing');
         this.setState({          
          player1_playing:1,
          player2_CurrentScore:0,
          rollSum: null,
          dice_1_resultVal:null,
          dice_2_resultVal: null,
        });
      }
    }else{
      console.log('dice are NOT equal to 6, keep playing');
    }//end of if dice are not equal to 6

    if(this.state.player1_CurrentScore >= this.state.winningScoreValue){
      console.log('player 1 won');
      this.setState({
        player1_winner:1,
      });
      this.newGame();
    }
    if(this.state.player2_CurrentScore >= this.state.winningScoreValue){
      console.log('player 2 won');
      this.setState({
        player2_winner:1,
      });
      this.newGame();
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
        <div className="container">
          <div className="gameBoard">
            <div className="buttons">         
              <button className="button rollDice" onClick={this.diceRoll}>Roll Dice</button>
              <button className="button" onClick={this.holdCurrentScore}>Hold</button>             
              <button className="button" onClick={this.newGame}>New Game</button>              
            </div>
            <div className="winningScoreDiv">
              <input 
                className="winningScore"
                type="text" 
                value={this.state.winningScoreValue}
                onChange={e=> this.setState({winningScoreValue: e.target.value})}
              />
            </div>
            <div className="gamePlay">
              <div>Player 1 Score: {this.state.player1_CurrentScore}</div>
              <div className="player">Player <strong><h3>{this.state.player1_playing ? '1' : '2'}</h3></strong> is playing</div>
              <div>Player 2 Score: {this.state.player2_CurrentScore}</div>
            </div>
          </div>
          {/*<div>Dice1: {this.state.dice_1_resultVal}</div>
          <div>Dice2: {this.state.dice_2_resultVal}</div>*/}
          <div className="liveGame">
            <div>Sum of the dice: {this.state.rollSum}</div>
            <div className="diceDiv">
            {this.state.gameNotStarted ? 
              <img className="dice-image" src={defaultDice} alt="reddice" /> :
              <div className="diceImages">
                <Dice image={this.state.dice1_Img}/>
                <Dice image={this.state.dice2_Img}/>             
              </div>}         
            </div>
          </div>
          <div className="winnerDiv">
            <Winner winningPlayer="1"/>
            <Winner winningPlayer="2"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;