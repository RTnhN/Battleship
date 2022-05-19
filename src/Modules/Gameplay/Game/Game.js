import Player from "../../Templates/Player/Player";
import DOM from "../DOM/DOM";


class Game {
  constructor(contentElement){
    this.contentElement = contentElement;
    this.DOM = new DOM(contentElement);
    this.currentPlayer;

    this.player1 = new Player('human');
    this.player2 = new Player('computer');

    this.player1.gameboard.placeShip({'x1':0, 'y1':0, 'x2':0, 'y2':2});
    this.player1.gameboard.placeShip({'x1':3, 'y1':3, 'x2':5, 'y2':3});

    this.player2.gameboard.placeShip({'x1':0, 'y1':0, 'x2':0, 'y2':2});
    this.player2.gameboard.placeShip({'x1':3, 'y1':3, 'x2':5, 'y2':3});

  }
  // startGame(){

  // }
}

export default Game;