require('dotenv').config()
const fetch = require('node-fetch')
const API_KEY = process.env.API_KEY

function generateID(){

    let id = ""
    for (let i = 0; i < 10; i++) {
    
        const rand = Math.floor(Math.random() * 10)
        id += rand
    }
   return id
}

async function GrabImage(destination) {
    //Unsplash Images

let dest = destination;
const searchURL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${dest}`

let ind = Math.floor(Math.random() * 10)
return fetch(searchURL)
    .then((response) => response.json())
    .then((pics) =>  pics.results[ind].urls.small); // returns url
    
}

exports.GrabImage = GrabImage
exports.generateID = generateID