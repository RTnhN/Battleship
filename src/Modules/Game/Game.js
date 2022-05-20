import Player from "../Templates/Player/Player";
import DOM from "../DOM/DOM";
import PointsHelper from "../Util/PointsHelper";


class Game {
  constructor(contentElement){
    this.fleetList = [{"size":5,"count":1},{"size":4,"count":2},{"size":3,"count":3}, {"size":2,"count":4}]
    this.startClick;
    this.endClick;
    this.contentElement = contentElement;
    this.DOM = new DOM(contentElement, this.fleetList);
    this.currentPlayer;
    this.opposingPlayer; 
    this.start(); 
  }
  start(){
    this.currentPlayerSetup = true;
    this.opposingPlayerSetup = false;
    this.player1 = new Player('human', 'player 1');
    this.player2 = new Player('computer', 'player 2');
    this.currentPlayer = Math.random() > .5 ? this.player1 : this.player2;
    this.opposingPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;

    this.player1.randomPlaceShips(this.fleetList);
    this.player2.randomPlaceShips(this.fleetList);
    this.DOM.updateDOMFromGameboard(this.player1.gameboard, this.player2.gameboard);
    this.mainGameLoop();
  }
  mainGameLoop(){
    let attack;
    this.DOM.status.textContent = this.currentPlayer.name;
    if (this.currentPlayer.type === 'human'){
      this.DOM.enemyGridContainer.addEventListener("click", this.executeAttack.bind(this), {once:true});
    } else if (this.currentPlayer.type === 'computer'){
      attack = this.currentPlayer.attack();
      this.attackResult = this.opposingPlayer.gameboard.receiveAttack(attack);
      if (this.attackResult === "hit"){
        this.currentPlayer.attackHits.push(attack);
      } else if (this.attackResult === 'miss'){
        this.currentPlayer.attackMisses.push(attack);
      }
      this.DOM.updateDOMFromGameboard(this.player1.gameboard, this.player2.gameboard);
      if (this.opposingPlayer.gameboard.allShipsSunk){
        alert(this.currentPlayer.name + ' has won')
        this.start();
      }
      this.switchPlayers();
      this.mainGameLoop();
    }
  }

  executeAttack(event){
    if (event.target.id === "enemyGridContainer"){
      this.DOM.enemyGridContainer.addEventListener("click", this.executeAttack.bind(this), {once:true});
      return
    }
    const coords = PointsHelper.DOMStringToObject(event.target.id);
    this.attackResult = this.opposingPlayer.gameboard.receiveAttack(coords);
    if (this.attackResult === "hit"){
      this.currentPlayer.attackHits.push(coords);
      if (this.opposingPlayer.gameboard.allShipsSunk){
        alert(this.currentPlayer.name + ' has won')
        this.start();
      }
      this.switchPlayers();
    } else if (this.attackResult === 'miss'){
      this.currentPlayer.attackMisses.push(coords);
      this.switchPlayers();
    } else if (this.attackResult === "alreadyHit"){      
    }
    this.mainGameLoop()

  }



  // startPlaceShip(event){
  //   this.startClick = PointsHelper.DOMStringToObject(event.target.id);
  // }

  // endPlaceShip(){

  // }

  switchPlayers(){
    this.currentPlayer = this.opposingPlayer
    this.opposingPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
  }

  // startGame(){

  // }
}

export default Game;