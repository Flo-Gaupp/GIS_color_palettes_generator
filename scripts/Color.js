"use strict";


export class Color {
    constructor(hexCode) {
        this.hexCode = hexCode;
    }

    randomColor() {
        const makingColorCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        this.hexCode = "";
        for (let i = 0; i < 6; i++) {
            this.hexCode = this.hexCode + makingColorCode[Math.floor(Math.random() * 16)];
        }
    }
}