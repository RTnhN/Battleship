import _ from "lodash";

class PointsHelper {
  static returnPointsBetweenCoords(coords) {
    const diffX = Math.abs(coords.x1 - coords.x2);
    const diffY = Math.abs(coords.y1 - coords.y2);
    let points;
    if (diffX === 0) {
      const yArray = PointsHelper.range(coords.y1, coords.y2);
      points = yArray.map((yPoint) => ({ "x": coords.x1, "y": yPoint }))
    } else if (diffY === 0) {
      const xArray = PointsHelper.range(coords.x1, coords.x2);
      points = xArray.map((xPoint) => ({ "y": coords.y1, "x": xPoint }))
    }
    return points;
  }

  static range(start, end) {
    start = Number(start);
    end = Number(end);
    const smallest = start > end ? end : start;
    const largest = start > end ? start : end
    return Array(largest - smallest + 1).fill().map((_, idx) => smallest + idx)
  }

  static ObjectToDOMString(gridContainer, coords) {
    return `${gridContainer.id},${coords.x},${coords.y}`
  }

  static DOMStringToObject(DOMString) {
    return { 'x': DOMString.split(',')[1], 'y': DOMString.split(',')[2] }
  }

  static breakApartShipPoints(pointPair){
    return [{'x':pointPair.x1, 'y':pointPair.y1}, {'x':pointPair.x2, 'y':pointPair.y2}]
  }

  static combineShipPoints(point1, point2){
    return {'x1':point1.x,'y1':point1.y, 'x2':point2.x, 'y2':point2.y}
  }

  static randomPointGenerator(start, end) {
    return { "x": _.random(start, end, false), "y": _.random(start, end, false) }
  }

  static getXYShipLen(point1, point2){
    return {'dx': Math.abs(point1.x - point2.x)+1, 'dy': Math.abs(point1.y - point2.y)+1}
  }

  static getShipLen(point1, point2){
    const XYShipLen = PointsHelper.getXYShipLen(point1, point2);
    return XYShipLen.dy < XYShipLen.dx ? XYShipLen.dx : XYShipLen.dy
  }

  static makeCoordsStraight(start, end){
    const distances = this.getXYShipLen(start, end);
    if (distances.dy > distances.dx){
      return(PointsHelper.combineShipPoints(start, {'x':start.x, 'y':end.y}))
    } else if (distances.dy < distances.dx){
      return(PointsHelper.combineShipPoints(start, {'x':end.x, 'y':start.y}))
    } else if (distances.dx === 1 && distances.dy === 1){
      return(PointsHelper.combineShipPoints(start, end))
    }
    return null
    
  }

  /*  I included this in this page with the author's name and other comments since this was
      not a standard package or anything.
  */
  /**
   * @author Peter Kelley
   * @author pgkelley4@gmail.com
   */

  /**
   * See if two line segments intersect. This uses the 
   * vector cross product approach described below:
   * http://stackoverflow.com/a/565282/786339
   * 
   * @param {Object} p point object with x and y coordinates
   *  representing the start of the 1st line.
   * @param {Object} p2 point object with x and y coordinates
   *  representing the end of the 1st line.
   * @param {Object} q point object with x and y coordinates
   *  representing the start of the 2nd line.
   * @param {Object} q2 point object with x and y coordinates
   *  representing the end of the 2nd line.
   */

  static doLineSegmentsIntersect(p, p2, q, q2) {
    var r = PointsHelper.subtractPoints(p2, p);
    var s = PointsHelper.subtractPoints(q2, q);
  
    var uNumerator = PointsHelper.crossProduct(PointsHelper.subtractPoints(q, p), r);
    var denominator = PointsHelper.crossProduct(r, s);
  
    if (uNumerator == 0 && denominator == 0) {
      // They are coLlinear
      
      // Do they touch? (Are any of the points equal?)
      if (PointsHelper.equalPoints(p, q) || PointsHelper.equalPoints(p, q2) || PointsHelper.equalPoints(p2, q) || PointsHelper.equalPoints(p2, q2)) {
        return true
      }
      // Do they overlap? (Are all the point differences in either direction the same sign)
      return !PointsHelper.allEqual(
          (q.x - p.x < 0),
          (q.x - p2.x < 0),
          (q2.x - p.x < 0),
          (q2.x - p2.x < 0)) ||
        !PointsHelper.allEqual(
          (q.y - p.y < 0),
          (q.y - p2.y < 0),
          (q2.y - p.y < 0),
          (q2.y - p2.y < 0));
    }
  
    if (denominator == 0) {
      // lines are paralell
      return false;
    }
  
    var u = uNumerator / denominator;
    var t = PointsHelper.crossProduct(PointsHelper.subtractPoints(q, p), s) / denominator;
  
    return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
  }
  
  /**
   * Calculate the cross product of the two points.
   * 
   * @param {Object} point1 point object with x and y coordinates
   * @param {Object} point2 point object with x and y coordinates
   * 
   * @return the cross product result as a float
   */
  static crossProduct(point1, point2) {
    return point1.x * point2.y - point1.y * point2.x;
  }
  
  /**
   * Subtract the second point from the first.
   * 
   * @param {Object} point1 point object with x and y coordinates
   * @param {Object} point2 point object with x and y coordinates
   * 
   * @return the subtraction result as a point object
   */ 
  static subtractPoints(point1, point2) {
    var result = {};
    result.x = point1.x - point2.x;
    result.y = point1.y - point2.y;
  
    return result;
  }
  
  /**
   * See if the points are equal.
   *
   * @param {Object} point1 point object with x and y coordinates
   * @param {Object} point2 point object with x and y coordinates
   *
   * @return if the points are equal
   */
  static equalPoints(point1, point2) {
    return (point1.x == point2.x) && (point1.y == point2.y)
  }
  
  /**
   * See if all arguments are equal.
   *
   * @param {...} args arguments that will be compared by '=='.
   *
   * @return if all arguments are equal
   */
  static allEqual(args) {
    var firstValue = arguments[0],
      i;
    for (i = 1; i < arguments.length; i += 1) {
      if (arguments[i] != firstValue) {
        return false;
      }
    }
    return true;
  }

}

export default PointsHelper;