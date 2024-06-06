export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.direction = "vertical";
    }

    hit() {
        if (this.hits < this.length) {
            this.hits += 1;
        }
        this.isSunk();
    }

    isSunk() {
        this.sunk = this.hits === this.length;
        return this.sunk;
    }
}
