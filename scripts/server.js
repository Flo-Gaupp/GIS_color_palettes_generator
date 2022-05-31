/* eslint-disable max-len */
"use strict";

const http = require('http');
const { url } = require('inspector');

const hostname = '127.0.0.1'; // localhost
const port = 3000;
let paletteHtml = "";


const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url = new URL(request.url || '', `http://${request.headers.host}`);
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
    return (`<div class="colorbar"><div class="color" style="background-color:#${allPalettes[counter].colors[0].hexCode}"><span>${allPalettes[counter].colors[0].hexCode}</span></div><div class="color" style="background-color:#${allPalettes[counter].colors[1].hexCode}"><span>${allPalettes[counter].colors[1].hexCode}</span></div><div class="color" style="background-color:#${allPalettes[counter].colors[2].hexCode}"><span>${allPalettes[counter].colors[2].hexCode}</span></div><div class="color" style="background-color:#${allPalettes[counter].colors[3].hexCode}"><span>${allPalettes[counter].colors[3].hexCode}</span></div><div class="color" style="background-color:#${allPalettes[counter].colors[4].hexCode}"><span>${allPalettes[counter].colors[4].hexCode}</span></div></div>`);
}
