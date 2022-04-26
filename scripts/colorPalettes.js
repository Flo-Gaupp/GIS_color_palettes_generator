"use strict";

/* Single_Color */

class Color {
    constructor() {
        this.hexCode = "";
        this.locked = false;
        this.name = "";
    }

    randomColor() {
        if (locked === false) {
            let makingColorCode = [1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F];
            let finalHexCode = "#";
            for (let i = 0; i < 6; i++) {
                finalHexCode = finalHexCode + makingColorCode[Math.floor(Math.random() * 16)];
            }
            this.hexCode = finalHexCode;
        }
    }
}


/* Color_Palette */

class ColorPalette {
    constructor() {
        this.color1 = new Color();
        this.color2 = new Color();
        this.color3 = new Color();
        this.color4 = new Color();
        this.color5 = new Color();
        this.colors = [color1, color2, color3, color4, color5];
    }

    generateColors() {
        for (col of this.colors) {
            col.randomColor();
        }
    }
}