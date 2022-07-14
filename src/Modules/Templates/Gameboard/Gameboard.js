import _ from 'lodash';
import Ship from '../Ship/Ship';
import PointsHelper from '../../Util/PointsHelper';

class Gameboard {
  constructor(boardSize = 10) {
    this.BOARD_SIZE = boardSize;
    this.board = Array.from(Array(this.BOARD_SIZE), () => new Array(this.BOARD_SIZE));
    this.ships = [];
    this.shipsCoords = [];
    this.cellsWithShips = [];
    this.hits = [];
    this.misses = [];
  }

  placeShip(coords) {
    const diffX = Math.abs(coords.x1 - coords.x2);
    const diffY = Math.abs(coords.y1 - coords.y2);
    if (diffX > 0 && diffY > 0) {
      throw Error('It seems that the ship is diagonal?!?');
    }
    const shipLength = Math.max(diffX, diffY) + 1;
    const shipIndex = this.ships.length;
    this.ships.push(new Ship(shipLength));
    this.shipsCoords.push(coords);
    const points = PointsHelper.returnPointsBetweenCoords(coords);
    points.forEach((pointsPair, index) => {
      this.board[pointsPair.x][pointsPair.y] = {
        ship: shipIndex,
        shipGridIndex: index,
      };
    });
    this.cellsWithShips = this.cellsWithShips.concat(points);
  }

  receiveAttack(coords) {
    if (this.hits
      .concat(this.misses)
      .find((hitsCoords) => _.isEqual(hitsCoords, coords)) === undefined) {
      const gridObject = this.board[coords.x][coords.y];
      if (gridObject !== undefined) {
        const { ship, shipGridIndex } = gridObject;
        this.hits.push(coords);
        return this.ships[ship].hit(shipGridIndex) ? 'hit' : 'alreadyHit';
      }
      this.misses.push(coords);
      return 'miss';
    }
    return 'alreadyHit';
  }

  resetGameboard() {
    this.ships = [];
    this.shipsCoords = [];
    this.cellsWithShips = [];
    this.hits = [];
    this.misses = [];
  }

  get allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }
}

export default Gameboard;
