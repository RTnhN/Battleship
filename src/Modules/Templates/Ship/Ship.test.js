import Ship from "./Ship.js"

let ship;

beforeEach(() => {
  ship = new Ship(3);
});

test('test to see if ship length is right', () => {
  expect(ship.length).toBe(3);
});

test('test damage array', () => {
  expect(ship.damageArray).toEqual([false, false, false]);
});

function testHit(){
  ship.hit(0);
  return ship.damageArray;
}


test('test to see that the hit registers', () => {
  expect(testHit()).toEqual([true, false, false]);
});

test('outside of range', () => {
  expect(() => {
    ship.hit(5);
  }).toThrowError(RangeError);
});

test('not sunk yet', () => {
  expect(ship.sunk).toBe(false);
});


function testSunk(){
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  return ship.sunk;
}

test('sunk', () => {
  expect(testSunk()).toBe(true);
});