/* eslint-disable max-len */
"use strict";

/*
import { Color } from "./Color.js";
import { ColorPalette } from "./ColorPalette.js";
*/

const _colorPalettesResultContainer = document.getElementById("resultContainer");
const _loadMoreButton = document.getElementById("loadMoreButton");

// Beispiel Paletten (noch keine Datenbank)
/*
const palette1 = new ColorPalette(new Color("C7EAE4"), new Color("A7E8BD"), new Color("FCBCB8"), new Color("EFA7A7"), new Color("FFD972"));
const palette2 = new ColorPalette(new Color("cdb4db"), new Color("ffc8dd"), new Color("ffafcc"), new Color("bde0fe"), new Color("a2d2ff"));
const palette3 = new ColorPalette(new Color("ccd5ae"), new Color("e9edc9"), new Color("fefae0"), new Color("faedcd"), new Color("d4a373"));
const palette4 = new ColorPalette(new Color("ffcbf2"), new Color("f3c4fb"), new Color("ecbcfd"), new Color("e5b3fe"), new Color("e2afff"));
const palette5 = new ColorPalette(new Color("f08080"), new Color("f4978e"), new Color("f8ad9d"), new Color("fbc4ab"), new Color("ffdab9"));
const palette6 = new ColorPalette(new Color("403E5C"), new Color("84D366"), new Color("EC18E5"), new Color("7AB66A"), new Color("E26228"));
const palette7 = new ColorPalette(new Color("FF9393"), new Color("482A80"), new Color("1F3FD4"), new Color("021B45"), new Color("429CCA"));

 const allPalettes = [palette1, palette2, palette3, palette4, palette5, palette6, palette7];
*/


// Serverrequest HTML ColorPalettes

const url = "http://localhost:3000/";
let dataPromise;

async function loadMoreRequestGET() {
    const response = await fetch(`${url}loadMore`);
    dataPromise = response.text();
    _colorPalettesResultContainer.innerHTML += await dataPromise;
    dataPromise.then(copyHexListener);
}

loadMoreRequestGET();

// EventListener CopyHex

function copyHexListener() {
    const _copyContainer = document.getElementsByClassName("color");
    for (const i of _copyContainer) {
        i.addEventListener("click", function(event) {
            const item = event.currentTarget.querySelector("span");
            const spanSafe = item.innerHTML;
            let spanContent = "<i class=\"fa-solid fa-2x fa-check icon_checked\"></i>";
            navigator.clipboard.writeText(item.innerHTML);
            item.innerHTML = spanContent;
            setTimeout(() => {
                spanContent = spanSafe;
                item.innerHTML = spanContent;
            }, 2000);
        });
    }
}

// Load more Button
_loadMoreButton.addEventListener("click", ()=> {
    loadMoreRequestGET();
});

