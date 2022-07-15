/* eslint-disable */

import PointsHelper from './PointsHelper';

function removeOnePointFromArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints = [{x:2, y:2}];
  const newPoints = PointsHelper.pointSetDiff(points, excPoints);
  return newPoints;
}


test('Remove one point from array', () => {
  expect(removeOnePointFromArray()).toEqual([{x:1, y:1}, {x:3, y:3}]);
});

function removeTwoPointsFromArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints = [{x:1, y:1}, {x:2, y:2}];
  return PointsHelper.pointSetDiff(points, excPoints);
}


test('Remove two points from array', () => {
  expect(removeTwoPointsFromArray()).toEqual([{x:3, y:3}]);
});

function removeOnePointFromArrayNotInArray() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints =  {x:2, y:2};
  return PointsHelper.pointSetDiff(points, excPoints);
}


test('Remove one point from array that is not originally in an array', () => {
  expect(removeOnePointFromArrayNotInArray()).toEqual([{x:1, y:1}, {x:3, y:3}]);
});

function unionTwoArraysPoints() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints =  {x:2, y:2};
  return PointsHelper.pointSetUnion(points, excPoints);
}


test('Do a union of an array and a point', () => {
  expect(unionTwoArraysPoints()).toEqual([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}]);
});

function intersectTwoArraysPoints() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints =  {x:2, y:2};
  return PointsHelper.pointSetIntersection(points, excPoints);
}


test('Do a union of an array and a point', () => {
  expect(intersectTwoArraysPoints()).toEqual([{x:2, y:2}]);
});


function intersectTwoArraysPointsDestructively() {
  const points = [{x:1, y:1}, {x:2, y:2}, {x:3, y:3}];
  const excPoints =  {x:5, y:5};
  return PointsHelper.pointSetIntersection(points, excPoints);
}


test('Do a union of an array and a point', () => {
  expect(intersectTwoArraysPointsDestructively()).toEqual([]);
});