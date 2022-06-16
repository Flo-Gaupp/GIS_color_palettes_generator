/* eslint-disable max-len */
"use strict";

const http = require("http");
const { url } = require("inspector");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
let paletteHtml = "";

const mongodb = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(mongoUrl);
const mongoPalettes = mongoClient.db("Color_Generator").collection("colorPalettes");
const mongoUser = mongoClient.db("Color_Generator").collection("user");

let signedIn = false;
let currentUser;

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    const url = new URL(request.url || "", `http://${request.headers.host}`);


    switch (url.pathname) {
    case "/signUp":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", async () => {
                await mongoClient.connect();
                const userList = await mongoUser.find({ username: JSON.parse(jsonString).username }).toArray();
                if (userList.length < 1) {
                    saveUser(jsonString);
                    signedIn = true;
                    currentUser = jsonString;
                    response.end("success");
                } else {
                    response.end("error");
                }
            });
        }
        break;


    case "/loadMore":
        if (request.method === "GET") {
            const allPalettes = await mongoPalettes.find().toArray();
            for (let counter = 0; counter < allPalettes.length; counter++) {
                paletteHtml += paletteToHtml(allPalettes, counter);
            }
            response.end(paletteHtml);
            paletteHtml = "";
        }
        break;


    case "/savePalette":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", () => {
                savePalette(jsonString);
            });
        }
        break;
    }
});

// Save Palette to MongoDB
async function savePalette(jsonString) {
    await mongoClient.connect();
    await mongoPalettes.insertOne(JSON.parse(jsonString));
}

// Create User to MongoDB
async function saveUser(jsonString) {
    await mongoClient.connect();
    await mongoUser.insertOne(JSON.parse(jsonString));
}

// Create HTMl for LoadMore
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


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
