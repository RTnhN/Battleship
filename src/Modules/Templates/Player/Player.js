/* eslint-disable no-plusplus */
import _ from 'lodash';
import Gameboard from '../Gameboard/Gameboard';
import PointsHelper from '../../Util/PointsHelper';

class Player {
  constructor(type, name) {
    this.gameboard = new Gameboard();
    this.type = type;
    this.name = name;
    this.attackHits = [];
    this.attackMisses = [];
    this.setup = false;
    if (type === 'computer') {
      this.attack = this.computerAttack;
    }
  }

  computerAttack() {
    let attack = PointsHelper.randomPointGenerator(0, this.gameboard.BOARD_SIZE - 1);
    // eslint-disable-next-line no-loop-func
    while (this.attacks.some((v) => _.isEqual(attack, v))) {
      attack = PointsHelper.randomPointGenerator(0, this.gameboard.BOARD_SIZE - 1);
    }
    return attack;
  }

  randomPlaceShips(fleet) {
    fleet.forEach(this.randomPlaceShip.bind(this));
  }

  randomPlaceShip(ship) {
    let firstPoint;
    let secondPoint;
    let invalid = true;
    for (let shipInstance = 0; shipInstance < ship.count; shipInstance++) {
      while (invalid) {
        firstPoint = PointsHelper.randomPointGenerator(0, this.gameboard.BOARD_SIZE - 1);
        secondPoint = this.generateRandomValidSecondPoint(firstPoint, ship.size);
        if (!this.newShipAndOldShipsOverlap(firstPoint, secondPoint)) {
          invalid = false;
        }
      }
      this.gameboard.placeShip(PointsHelper.combineShipPoints(firstPoint, secondPoint));
      invalid = true;
    }
  }

  generateRandomValidSecondPoint(point, size) {
    const points = [];
    const boardSize = this.gameboard.BOARD_SIZE;
    points.push({ x: (point.x + size - 1), y: point.y });
    points.push({ x: (point.x - size + 1), y: point.y });
    points.push({ x: (point.x), y: point.y + size - 1 });
    points.push({ x: (point.x), y: point.y - size + 1 });
    const validPoints = points
      .filter((pointi) => (pointi.x < boardSize
          && pointi.x >= 0
          && pointi.y < boardSize
          && pointi.y >= 0));
    return _.sample(validPoints);
  }

  newShipAndOldShipsOverlap(firstPoint, secondPoint) {
    return this.gameboard.shipsCoords
      .some((shipCoord) => PointsHelper
        .doLineSegmentsIntersect(
          firstPoint,
          secondPoint,
          ...PointsHelper.breakApartShipPoints(shipCoord),
        ));
  }

  get attacks() {
    return this.attackHits.concat(this.attackMisses);
  }
}

export default Player;
