/**
 * @jest-environment jsdom
 */

import DOM from "./DOM";

let testElement;

function makeGridSquare(){
  testElement = document.createElement('div');
  DOM.createGrid(testElement, 10)
  return testElement.childElementCount
}

test('make sure that the grids are made correctly', () => {
  expect(makeGridSquare()).toBe(100);
});

function makeGridRectangular(){
  testElement = document.createElement('div');
  DOM.createGrid(testElement, 10, 5) 
  return testElement.childElementCount
}

test('make sure that the grids are made correctly', () => {
  expect(makeGridRectangular()).toBe(50);
});

function makeGridRectangularCheckId(){
  testElement = document.createElement('div');
  testElement.id = 'test'
  DOM.createGrid(testElement, 10) 
  return testElement.children[12].id
}

test('make sure that the grids are made correctly', () => {
  expect(makeGridRectangularCheckId()).toBe("test,3,2");
});