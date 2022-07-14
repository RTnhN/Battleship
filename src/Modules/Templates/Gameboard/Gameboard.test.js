/* eslint-disable */

import Gameboard from "./Gameboard.js"

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard(3)
});

function placeShip(){
  let coords = {x1:0, y1:0, x2:0, y2:2}
  gameboard.placeShip(coords)
  return gameboard.board
}

test('should ', () => {
  expect(placeShip()).toEqual([[{'ship':0, 'shipGridIndex':0},{'ship':0, 'shipGridIndex':1},{'ship':0, 'shipGridIndex':2}],[,, ],[, , ]]);
});


function placeShipAndGoodAttack(){
  let shipCoords = {'x1':0, 'y1':0, 'x2':0, 'y2':2};
  gameboard.placeShip(shipCoords);
  let attackCoords = {'x':0, 'y':0};
  return gameboard.receiveAttack(attackCoords);
}

test('Receive good attack', () => {
  expect(placeShipAndGoodAttack()).toBe('hit');
});

function placeShipAndMissedAttack(){
  let shipCoords = {'x1':0, 'y1':0, 'x2':0, 'y2':2};
  gameboard.placeShip(shipCoords);
  let attackCoords = {'x':1, 'y':0};
  return  gameboard.receiveAttack(attackCoords);

}

test('Receive missing attack', () => {
  expect(placeShipAndMissedAttack()).toBe('miss');
});

function placeShipAndBadAttack(){
  let shipCoords = {'x1':0, 'y1':0, 'x2':0, 'y2':2};
  gameboard.placeShip(shipCoords);
  let attackCoords = {'x':0, 'y':0};
  gameboard.receiveAttack(attackCoords);
  return  gameboard.receiveAttack(attackCoords);

}

test('Receive bad attack', () => {
  expect(placeShipAndBadAttack()).toBe('alreadyHit');
});

function hitShipCheckSink(){
  let shipCoords = {'x1':0, 'y1':0, 'x2':0, 'y2':1};
  gameboard.placeShip(shipCoords);
  let attackCoords = {'x':0, 'y':0};
  gameboard.receiveAttack(attackCoords);
  return gameboard.allShipsSunk

}

test('hit ship check sink ', () => {
  expect(hitShipCheckSink()).toBe(false);
});

function sinkShipCheckSink(){
  let shipCoords = {'x1':0, 'y1':0, 'x2':0, 'y2':1};
  gameboard.placeShip(shipCoords);
  let attackCoords = {'x':0, 'y':0};
  gameboard.receiveAttack(attackCoords);
  attackCoords = {'x':0, 'y':1};
  gameboard.receiveAttack(attackCoords);
  return gameboard.allShipsSunk
}

test('sink ship check sink ', () => {
  expect(sinkShipCheckSink()).toBe(true);
});
