/* eslint-disable max-len */
"use strict";

const http = require("http");
const { url } = require("inspector");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
let paletteHtml = "";


const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    const url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
    case "/loadMore":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", () => {
                const allPalettes = JSON.parse(jsonString);
                for (let counter = 0; counter < allPalettes.length; counter++) {
                    paletteHtml += paletteToHtml(allPalettes, counter);
                }
                response.end(paletteHtml);
                paletteHtml = "";
            });
        }
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


function paletteToHtml(allPalettes, counter) {
    let paletteHtml = `<div class="colorbar">`;
    for (let i = 0; i < allPalettes[counter].colors.length; i++) {
        const hexCode = allPalettes[counter].colors[i].hexCode;
        paletteHtml += `<div class="color" style="background-color:#${hexCode}"><span style="color:${getContrast50(hexCode)}">${hexCode}</span></div>`;
    }
    paletteHtml += `</div>`;
    return (paletteHtml);
}

function getContrast50(hexcolor) {
    return (parseInt(hexcolor, 16) > 0xffffff / 2) ? "#000000" : "#ffffff";
}
