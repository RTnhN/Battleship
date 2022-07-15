import _ from 'lodash';

class PointsHelper {
  static returnPointsBetweenCoords(coords) {
    const diffX = Math.abs(coords.x1 - coords.x2);
    const diffY = Math.abs(coords.y1 - coords.y2);
    let points;
    if (diffX === 0) {
      const yArray = PointsHelper.range(coords.y1, coords.y2);
      points = yArray.map((yPoint) => ({ x: coords.x1, y: yPoint }));
    } else if (diffY === 0) {
      const xArray = PointsHelper.range(coords.x1, coords.x2);
      points = xArray.map((xPoint) => ({ y: coords.y1, x: xPoint }));
    }
    return points;
  }

  static range(startParam, endParam) {
    const start = Number(startParam);
    const end = Number(endParam);
    const smallest = start > end ? end : start;
    const largest = start > end ? start : end;
    return Array(largest - smallest + 1).fill().map((__, idx) => smallest + idx);
  }

  static ObjectToDOMString(gridContainer, coords) {
    return `${gridContainer.id},${coords.x},${coords.y}`;
  }

  static DOMStringToObject(DOMString) {
    return { x: Number(DOMString.split(',')[1]), y: Number(DOMString.split(',')[2]) };
  }

  static breakApartShipPoints(pointPair) {
    return [{ x: pointPair.x1, y: pointPair.y1 }, { x: pointPair.x2, y: pointPair.y2 }];
  }

  static combineShipPoints(point1, point2) {
    return {
      x1: point1.x, y1: point1.y, x2: point2.x, y2: point2.y,
    };
  }

  static randomPointGenerator(start, end) {
    return { x: _.random(start, end, false), y: _.random(start, end, false) };
  }

  static getXYShipLen(point1, point2) {
    return { dx: Math.abs(point1.x - point2.x) + 1, dy: Math.abs(point1.y - point2.y) + 1 };
  }

  static getShipLen(point1, point2) {
    const XYShipLen = PointsHelper.getXYShipLen(point1, point2);
    return XYShipLen.dy < XYShipLen.dx ? XYShipLen.dx : XYShipLen.dy;
  }

  static pointsEqual(point1, point2) {
    return (point1.x === point2.x && point1.y === point2.y);
  }

  static pointSetDiff(points, excPoints) {
    const excPointsArray = Array.isArray(excPoints) ? excPoints : [excPoints];
    return _.differenceWith(points, excPointsArray, _.isEqual);
  }

  static pointSetUnion(pointsA, pointsB) {
    const pointsAArray = Array.isArray(pointsA) ? pointsA : [pointsA];
    const pointsBArray = Array.isArray(pointsB) ? pointsB : [pointsB];
    return _.unionWith(pointsAArray, pointsBArray, _.isEqual);
  }

  static pointSetIntersection(pointsA, pointsB) {
    const pointsAArray = Array.isArray(pointsA) ? pointsA : [pointsA];
    const pointsBArray = Array.isArray(pointsB) ? pointsB : [pointsB];
    return _.intersectionWith(pointsAArray, pointsBArray, _.isEqual);
  }

  static uniquePoints(points) {
    return _.uniqWith(points, _.isEqual);
  }

  static makeCoordsStraight(start, end) {
    const distances = this.getXYShipLen(start, end);
    if (distances.dy > distances.dx) {
      return (PointsHelper.combineShipPoints(start, { x: start.x, y: end.y }));
    } if (distances.dy < distances.dx) {
      return (PointsHelper.combineShipPoints(start, { x: end.x, y: start.y }));
    } if (distances.dx === 1 && distances.dy === 1) {
      return (PointsHelper.combineShipPoints(start, end));
    }
    return null;
  }

  static bufferFromShip(ship, boardSize) {
    const bufferPoints = [];
    PointsHelper.returnPointsBetweenCoords(ship)
      .forEach((point) => {
        bufferPoints.push({ x: (point.x - 1), y: point.y });
        bufferPoints.push({ x: (point.x + 1), y: point.y });
        bufferPoints.push({ x: (point.x), y: point.y - 1 });
        bufferPoints.push({ x: (point.x), y: point.y + 1 });
      });
    const validBufferPoints = bufferPoints
      .filter((pointi) => (pointi.x < boardSize
        && pointi.x >= 0
        && pointi.y < boardSize
        && pointi.y >= 0));
    return PointsHelper
      .pointSetDiff(
        PointsHelper.uniquePoints(validBufferPoints),
        PointsHelper.returnPointsBetweenCoords(ship),
      );
  }
}

export default PointsHelper;
