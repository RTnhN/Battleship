/* eslint-disable */

import PointsHelper from './PointsHelper';

function removeOnePointFromArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints = [{x:2, y:2}];
  const newPoints = PointsHelper.pointSetDiff(points, excPoints);
  return newPoints;
}


test('Create computer player and attack', () => {
  expect(removeOnePointFromArray()).toEqual([{x:1, y:1}, {x:3, y:3}]);
});

function removeTwoPointsFromArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints = [{x:1, y:1}, {x:2, y:2}];
  return PointsHelper.pointSetDiff(points, excPoints);
}


test('Create computer player and attack', () => {
  expect(removeTwoPointsFromArray()).toEqual([{x:3, y:3}]);
});

function removeOnePointFromArrayNotInArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints =  {x:2, y:2};
  return PointsHelper.pointSetDiff(points, excPoints);
}


test('Create computer player and attack', () => {
  expect(removeOnePointFromArrayNotInArray()).toEqual([{x:1, y:1}, {x:3, y:3}]);
});