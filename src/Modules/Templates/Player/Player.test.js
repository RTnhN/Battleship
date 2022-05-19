import Player from "./Player.js";

let player;

function createComputerPlayerAndAttack(){
  player = new Player("computer");
  return player.attack();
}

test('Create computer player and attack', () => {
  expect(createComputerPlayerAndAttack()).toBeDefined();
});