import Ship from "../Ship/Ship.js"
import _ from "lodash";

class Gameboard {
  constructor(boardSize = 10) {
    this.BOARD_SIZE = boardSize;
    this.board = Array.from(Array(this.BOARD_SIZE), () => new Array(this.BOARD_SIZE))
    this.ships = [];
    this.goodHits= [];
    this.badHits = [];
  }
  placeShip(coords){
    const diffX = Math.abs(coords.x1 - coords.x2);
    const diffY = Math.abs(coords.y1 - coords.y2);
    if (diffX > 0 && diffY > 0){
      throw Error('It seems that the ship is diagonal?!?'); 
    }
    const shipLength = Math.max(diffX, diffY) + 1;
    const shipIndex = this.ships.length;
    this.ships.push(new Ship(shipLength));
    const points = Gameboard.returnCoordsBetweenPoints(coords);
    points.forEach((pointsPair, index)=>this.board[pointsPair.x][pointsPair.y]= {"ship":shipIndex, "shipGridIndex":index});
  }

  receiveAttack(coords){
    if (this.goodHits.concat(this.badHits).find(hitsCoords=> _.isEqual(hitsCoords, coords)) === undefined){
      const gridObject = this.board[coords.x][coords.y];
      if (gridObject !== undefined){
        const {ship, shipGridIndex} = gridObject;
        this.goodHits.push(coords);
        return this.ships[ship].hit(shipGridIndex) ? 'hit' : 'alreadyHit' ;
      }
      this.badHits.push(coords);
      return 'miss';
      
    } 
    return 'alreadyHit';
    }
    get allShipsSunk(){
      return this.ships.every(ship => ship.sunk === true);
    }
  static returnCoordsBetweenPoints(coords){
    const diffX = Math.abs(coords.x1 - coords.x2);
    const diffY = Math.abs(coords.y1 - coords.y2);
    let points;
    if (diffX === 0){
      const yArray = Gameboard.range(coords.y1, coords.y2);
      points = yArray.map((yPoint)=> ({"x":coords.x1, "y":yPoint}))
    } else if (diffY === 0) {
      const xArray = Gameboard.range(coords.x1, coords.x2);
      points = xArray.map((xPoint)=> ({"y":coords.y1, "x":xPoint}))
    }
    return points;
  }

  static range(start, end) {
    const smallest = start > end ? end : start;
    const largest = start > end ? start : end
    return Array(largest - smallest + 1).fill().map((_, idx) => smallest + idx)
  }
}

export default Gameboard;
