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
    let fleetTries = 0;
    const FLEET_TRIES_MAX = 10;
    let fleetStatus = [];
    fleetStatus = fleet.map(this.randomPlaceShip.bind(this));
    while (fleetStatus.some((ship) => ship === false)) {
      fleetTries += 1;
      this.gameboard.resetGameboard();
      fleetStatus = fleet.map(this.randomPlaceShip.bind(this));
      if (fleetTries > FLEET_TRIES_MAX) {
        throw (Error('There is a problem with placement of random ships.'));
      }
    }
  }

  randomPlaceShip(shipKind) {
    let tries = 0;
    const MAX_TRIES = 10;
    let firstPoint;
    let secondPoint;
    let shipCoords;
    let invalid = true;
    for (let shipInstance = 0; shipInstance < shipKind.count; shipInstance++) {
      while (invalid) {
        firstPoint = PointsHelper.randomPointGenerator(0, this.gameboard.BOARD_SIZE - 1);
        secondPoint = this.generateRandomValidSecondPoint(firstPoint, shipKind.size);
        shipCoords = PointsHelper
          .returnPointsBetweenCoords(PointsHelper.combineShipPoints(firstPoint, secondPoint));
        if (PointsHelper.pointSetIntersection(
          shipCoords,
          this.gameboard.occupiedCells,
        ).length === 0) {
          invalid = false;
        } else {
          tries += 1;
          if (tries > MAX_TRIES) {
            return false;
          }
        }
      }
      tries = 0;
      this.gameboard.placeShip(PointsHelper.combineShipPoints(firstPoint, secondPoint));
      invalid = true;
    }
    return true;
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
    return PointsHelper.uniquePoints(this.gameboard.shipsCoords, this.gameboard.shipBufferCells)
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
