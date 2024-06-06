import Ship from '../assets/ship.js'

let ship;
beforeEach(() =>{
    ship = new Ship(4);
});

test('Ship init', () => {
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBeFalsy();
});

test('hit correctly', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
});

test('hit not surpass length', () => {
    for(let i = 0; i < 6; i++){
        ship.hit();
    }
    expect(ship.hits).toBe(4);
});


test('isSunk correctly',  () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBeTruthy();
})

test('isSunk not set to true when hit !== length',  () => {
    ship.hit();
    ship.hit();
    ship.isSunk();
    expect(ship.sunk).toBeFalsy();
})