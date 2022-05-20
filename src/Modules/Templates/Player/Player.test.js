import Player from "./Player.js";

let player;

function createComputerPlayerAndAttack(){
  player = new Player("computer");
  return player.attack();
}

test('Create computer player and attack', () => {
  expect(createComputerPlayerAndAttack()).toBeDefined();
});

function randomPlaceShipTest(){
  player = new Player('computer');
  const fleetList = [{"size":5,"count":1},{"size":4,"count":2},{"size":3,"count":3}, {"size":2,"count":4}]
  player.randomPlaceShips(fleetList)
}


function testGenerateRandomValidSecondPoint(){
  player = new Player("computer");
  const point = {'x':5, 'y':5};
  const secondPoint = player.generateRandomValidSecondPoint(point, 3)
  const diffX = Math.abs(point.x - secondPoint.x);
  const diffY = Math.abs(point.y - secondPoint.y);
  return Math.max(diffX, diffY)+1
}

test('should ', () => {
  expect(testGenerateRandomValidSecondPoint()).toBe(3);
});

function computerAttackTwice(){
  player = new Player("computer");
  const firstAttack = player.attack()
  player.attackHits.push(firstAttack);
  const secondAttack = player.attack()
  return (firstAttack.x !== secondAttack.x && firstAttack.y !== secondAttack.y)
}

test('Two attacks not same place ', () => {
  expect(computerAttackTwice()).toBe(true);
});