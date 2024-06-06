import Gameboard from '../assets/gameboard.js';
import Ship from '../assets/ship.js';
let gameboard;

beforeEach(() => {
    gameboard = new Gameboard();
});

test('GameBoard init', () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
});

test('placeShip places ship correctly horizontally', () => {
    const ship = new Ship(3);
    const placed = gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(placed).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
});

test('placeShip places ship correctly vertically', () => {
    const ship = new Ship(3);
    const placed = gameboard.placeShip(ship, 0, 0, 'vertical');
    expect(placed).toBe(true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
});

test('placeShip returns false if invalid placement', () => {
    const ship = new Ship(3);
    const placed = gameboard.placeShip(ship, 0, 8, 'horizontal');
    expect(placed).toBe(false);
});

test('randomPlaceShip places ship randomly', () => {
    const mockGetRandomInt = jest.fn()
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(0);

    const ship = new Ship(3);
    gameboard.randomPlaceShip(ship, mockGetRandomInt);

    expect(gameboard.board.flat().filter(cell => cell === ship).length).toBe(ship.length);
});

test('hit correctly', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    expect(gameboard.receiveAttack(0, 0)).toBe(true);
    expect(ship.hits).toBe(1);

    expect(gameboard.receiveAttack(0, 1)).toBe(true);
    expect(ship.hits).toBe(2);

    expect(gameboard.receiveAttack(0, 2)).toBe(true);
    expect(ship.hits).toBe(3);
});

test('hit not surpass length', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3); // Miss

    expect(ship.hits).toBe(3); 
});

test('isSunk correctly', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);

    expect(ship.isSunk()).toBe(true);
});

test('isSunk not set to true when hit !== length', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    expect(ship.isSunk()).toBe(false);
});
