/* eslint-disable max-len */
"use strict";

const http = require("http");
const { url } = require("inspector");

const hostname = "127.0.0.1"; // localhost
const port = 3000;
let paletteHtml = "";

const mongodb = require("mongodb");

const mongoUrl = "mongodb://localhost:27017"; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(mongoUrl);
const mongoPalettes = mongoClient.db("Color_Generator").collection("colorPalettes");
const mongoUser = mongoClient.db("Color_Generator").collection("user");

let signedIn = false;
let currentUser;

async function startServer() {
    await mongoClient.connect();
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}


const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    const url = new URL(request.url || "", `http://${request.headers.host}`);


    switch (url.pathname) {
    case "/logOut":
        if (request.method === "GET") {
            signedIn = false;
            response.end();
        }
        break;


    case "/signStatus":
        if (request.method === "GET") {
            if (signedIn === false) {
                response.end("none signed in user");
            } else {
                response.end(JSON.stringify(currentUser.username));
            }
        }
        break;


    case "/signUp":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", async () => {
                const userList = await mongoUser.find({ username: JSON.parse(jsonString).username }).toArray();
                if (userList.length < 1) {
                    saveUser(jsonString);
                    signedIn = true;
                    currentUser = JSON.parse(jsonString);
                    response.end("success");
                } else {
                    response.end("error");
                }
            });
        }
        break;

    case "/signIn":
        if (request.method === "POST") {
            let jsonString = "";
            request.on("data", (data) => {
                jsonString += data;
            });
            request.on("end", async () => {
                const userList = await mongoUser.find({ username: JSON.parse(jsonString).username }).toArray();
                if (userList.length < 1) {
                    response.end("user_error");
                } else {
                    if (userList[0].password !== JSON.parse(jsonString).password) {
                        response.end("error_password");
                    } else {
                        currentUser = userList[0];
                        signedIn = true;
                        response.end("success");
                    }
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

    case "/loadMoreUserPalettes":
        if (request.method === "GET") {
            const allPalettes = currentUser.colorPalettes;
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
    await mongoPalettes.insertOne(JSON.parse(jsonString));
    currentUser.colorPalettes.push(JSON.parse(jsonString));
    await mongoUser.replaceOne({ username: currentUser.username }, currentUser);
}

// Create User to MongoDB
async function saveUser(jsonString) {
    await mongoUser.insertOne(JSON.parse(jsonString));
}

// Create HTMl for LoadMore
function paletteToHtml(allPalettes, counter) {
    let paletteHtml = "<div class=\"colorbar\">";
    for (let i = 0; i < allPalettes[counter].colors.length; i++) {
        const hexCode = allPalettes[counter].colors[i].hexCode;
        paletteHtml += `<div class="color" style="background-color:#${hexCode}"><span style="color:${getContrast50(hexCode)}">${hexCode}</span></div>`;
    }
    paletteHtml += "</div>";
    return (paletteHtml);
}

function getContrast50(hexcolor) {
    return (parseInt(hexcolor, 16) > 0xffffff / 2) ? "#000000" : "#ffffff";
}

startServer();
