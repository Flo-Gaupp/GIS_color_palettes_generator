"use strict";

const hexCodeText = document.getElementsByClassName("hex_code_text");
const copyIcons = document.getElementsByClassName("colorbar_toolbar_copy_hex");
const copyHexConfirmationContainer = document.querySelector(".copy_hex_confirmation_container");
const colors = document.getElementsByClassName("palette_generator_color");
const lockIcons = document.getElementsByClassName("colorbar_toolbar_unlock");


/* generate Color on Spacebar */

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        generateColors();
    }
}
);

function randomColor() {
    const makingColorCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexCode = "";
    for (let i = 0; i < 6; i++) {
        hexCode = hexCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return hexCode;
}

function generateColors() {
    for (const col of colors) {
        if (col.querySelector(".icon_unlock").classList.contains("fa-unlock")) {
            const newColor = randomColor();
            col.style.backgroundColor = "#" + newColor;
            col.querySelector("p").innerHTML = newColor;
        }
    }
}


/* Lock Colors */


for (let i of lockIcons) {
    i.addEventListener("click", toggleLock);
}

function toggleLock(event) {
    const icon = event.currentTarget.querySelector(".icon_unlock");
    icon.classList.toggle("fa-unlock");
    icon.classList.toggle("fa-lock");
}

/* Copy Hexcode to Clipboard */

for (let i = 0; i < copyIcons.length; i++) {
    copyIcons[i].addEventListener("click", function() {
        copyHexCode(i);
    });
}
function copyHexCode(counter) {
    navigator.clipboard.writeText(hexCodeText[counter].innerHTML);
    copyIcons[counter].querySelector("i").classList.replace("fa-copy", "fa-check");
    copyHexConfirmationContainer.classList.add("copied");
    setTimeout(() => {
        copyHexConfirmationContainer.classList.remove("copied");
        copyIcons[counter].querySelector("i").classList.replace("fa-check", "fa-copy");
    }, 2000);
}
