import Player from "../Templates/Player/Player";
import DOM from "../DOM/DOM";
import PointsHelper from "../Util/PointsHelper";


class Game {
  constructor(contentElement){
    this.fleetList = [{"size":5,"count":1},{"size":4,"count":2},{"size":3,"count":3}, {"size":2,"count":4}]
    this.startClick = null;
    this.endClick = null;
    this.startClickElement;
    this.contentElement = contentElement;
    this.DOM = new DOM(contentElement, this.fleetList);
    this.currentPlayer;
    this.opposingPlayer; 
    this.start(); 
  }
  start(){
    this.player1 = new Player('human', 'player 1');
    this.player2 = new Player('computer', 'player 2');
    this.currentPlayer = Math.random() > .5 ? this.player1 : this.player2;
    this.opposingPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    this.reset();
    this.setup();
  }

  reset(){
    this.DOM.clearGrids();
  }

  mainGameLoop(){
    let attack;
    this.DOM.updateDOMFromGameboard(this.player1.gameboard, this.player2.gameboard);
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
        return;
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
        return;
      }
      this.switchPlayers();
    } else if (this.attackResult === 'miss'){
      this.currentPlayer.attackMisses.push(coords);
      this.switchPlayers();
    } else if (this.attackResult === "alreadyHit"){      
    }
    this.mainGameLoop()

  }

  setup(){
    if (this.currentPlayer.setup && this.opposingPlayer.setup){
      this.mainGameLoop();
      return;
    }
    if (this.currentPlayer.type === 'computer'){
      this.currentPlayer.randomPlaceShips(this.fleetList);
      this.currentPlayer.setup = true;
      this.switchPlayers();
      this.setup();
      return;
    } else {
      DOM.clearGrid(this.DOM.placeShipModalGrid);
      this.fleetListClone = structuredClone(this.fleetList);
      this.DOM.updatePlaceShipModalRows(this.fleetListClone);
      this.DOM.placeShipModal.showModal();
      this.controller = new AbortController();
      this.DOM.placeShipModalGrid.addEventListener('click', this.placeShipModalGridClicked.bind(this), {signal:this.controller.signal});
    }
  }

  placeShipModalGridClicked(event){
    if (event.target === event.currentTarget){
      return;
    } 
    if (this.startClick === null){
      this.startClick = PointsHelper.DOMStringToObject(event.target.id);
      this.startClickElement = event.target;
      this.startClickElement.classList.add('coloredShip');
    } else {
      this.endClick = PointsHelper.DOMStringToObject(event.target.id);
      const straightCoords = PointsHelper.makeCoordsStraight(this.startClick, this.endClick)
      if (straightCoords === null){
        alert('Try to click on two grid squares that are in line with each other. Currently, it is ambiguous how you want the ship placed (it can\'t be diagonal obviously.).');
        this.startClick = null;
        this.endClick = null;
        this.startClickElement.classList.remove('coloredShip');
        return;
      }
      const shipLength = PointsHelper.getShipLen(this.startClick, this.endClick);
      const removeShipFromFleetStatus = this.removeShipFromFleet(shipLength);
      if (removeShipFromFleetStatus === 'no ship'){
        alert('there is not a ship that length, try again');
        this.startClick = null;
        this.endClick = null;
        this.startClickElement.classList.remove('coloredShip');
        return;
      } 
      this.currentPlayer.gameboard.placeShip(straightCoords);
      DOM.paintShipLocation(this.DOM.placeShipModalGrid, straightCoords);
      this.DOM.updatePlaceShipModalRows(this.fleetListClone);
      if (removeShipFromFleetStatus === "all ships placed"){
        this.currentPlayer.setup = true;
        this.switchPlayers()
        this.DOM.placeShipModal.close();
        this.startClick = null;
        this.endClick = null;
        this.controller.abort();
        this.setup();
        return;
      }
      this.startClick = null;
      this.endClick = null;
    }
  }

  removeShipFromFleet(shipLength){
    const shipIndex = this.fleetListClone.findIndex(ship => ship.size === shipLength);
    if (shipIndex === -1){
      return 'no ship';
    }
    if (this.fleetListClone[shipIndex].count === 1){
      this.fleetListClone.splice(shipIndex, 1);
    } else {
      this.fleetListClone[shipIndex].count -= 1;
    }
    if (this.fleetListClone.length === 0){
      return 'all ships placed';
    }
    return 'ship placed';
  }

  switchPlayers(){
    this.currentPlayer = this.opposingPlayer;
    this.opposingPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
}

export default Game;