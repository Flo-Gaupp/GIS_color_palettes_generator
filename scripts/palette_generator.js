"use strict";

import { Color } from "./Color.js";
import { ColorPalette } from "./ColorPalette.js";


const hexCodeText = document.getElementsByClassName("hex_code_text");
const _copyIcons = document.getElementsByClassName("colorbar_toolbar_copy_hex");
const copyHexConfirmationContainer = document.querySelector(".copy_hex_confirmation_container");
const _colors = document.getElementsByClassName("palette_generator_color");
const _lockIconAtag = document.getElementsByClassName("colorbar_toolbar_unlock");
const _lockIcon = document.getElementsByClassName("icon_unlock");
const _colorLabel = document.getElementsByClassName("colorLabel");


// eslint-disable-next-line max-len
const currentPalette = new ColorPalette(new Color("C7EAE4"), new Color("A7E8BD"), new Color("FCBCB8"), new Color("EFA7A7"), new Color("FFD972"));


/* generate Color on Spacebar */

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        generateColors();
    }
}
);


function generateColors() {
    for (let i = 0; i < _colors.length; i++) {
        if (_lockIcon[i].classList.contains("fa-unlock")) {
            currentPalette.colors[i].randomColor();
            const hexCode = currentPalette.colors[i].hexCode;
            _colors[i].style.backgroundColor = "#" + hexCode;
            const hexCodeP = _colors[i].querySelector("p");
            hexCodeP.innerHTML = hexCode;
            const name = _colorLabel[i];
            colorNameRequest(hexCode, name);
            if (getContrast50(hexCodeP.innerHTML) === "black") {
                hexCodeP.style.color = "#000000";
            } else {
                hexCodeP.style.color = "#ffffff";
            }
        }
    }
}

/* Color API ColorNames */

async function colorNameRequest(hexCode, name) {
    const url = "https://www.thecolorapi.com/id?hex=" + hexCode;
    const response = await fetch(url);
    console.log(response);
    console.log(JSON.parse(response));
    name.innerHTML = await response.text();
}

/* Choose correct font color */

function getContrast50(hexcolor) {
    return (parseInt(hexcolor, 16) > 0xffffff / 2) ? "black" : "white";
}


/* Lock Colors */


for (let i of _lockIconAtag) {
    i.addEventListener("click", toggleLock);
}

function toggleLock(event) {
    const icon = event.currentTarget.querySelector(".icon_unlock");
    icon.classList.toggle("fa-unlock");
    icon.classList.toggle("fa-lock");
}

/* Copy Hexcode to Clipboard */

for (let i = 0; i < _copyIcons.length; i++) {
    _copyIcons[i].addEventListener("click", function() {
        copyHexCode(i);
    });
}
function copyHexCode(counter) {
    navigator.clipboard.writeText(hexCodeText[counter].innerHTML);
    _copyIcons[counter].querySelector("i").classList.replace("fa-copy", "fa-check");
    copyHexConfirmationContainer.classList.add("copied");
    setTimeout(() => {
        copyHexConfirmationContainer.classList.remove("copied");
        _copyIcons[counter].querySelector("i").classList.replace("fa-check", "fa-copy");
    }, 2000);
}


