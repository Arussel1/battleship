import Ship from './ship.js';

export default class Gameboard{
    constructor(){
        this.board =  Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
    }
    placeShip(ship, x, y, direction, getRandomInt) {
        if (!this.isValidPlacement(ship, x, y, direction)) {
            return false;
        }
        if (direction === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.board[x][y + i] = ship;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.board[x + i][y] = ship;
            }
        }
        this.ships.push(ship);
        return true;
    }

    isValidPlacement(ship, x, y, direction) {
        if (direction === 'horizontal') {
            if (y + ship.length > 10) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.board[x][y + i] !== null) return false;
            }
        } else if (direction === 'vertical') {
            if (x + ship.length > 10) return false;
            for (let i = 0; i < ship.length; i++) {
                if (this.board[x + i][y] !== null) return false;
            }
        }
        return true;
    }

    randomPlaceShip(ship, getRandomInt) {
        let placed = false;
        while (!placed) {
            const direction = getRandomInt(2) === 0 ? 'horizontal' : 'vertical';
            const x = getRandomInt(10 - (direction === 'horizontal' ? 0 : ship.length - 1));
            const y = getRandomInt(10 - (direction === 'vertical' ? 0 : ship.length - 1));
            placed = this.placeShip(ship, x, y, direction, getRandomInt);
        }
    }
    receiveAttack(x, y) {
        const target = this.board[x][y];
        if (target && target !== "hit") {
            target.hit();
            this.board[x][y] = "hit";
            return true;
        } else {
            this.board[x][y] = "miss";
            return false;
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}