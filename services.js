const fetch = require('node-fetch')
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

const API = `https://api.unsplash.com/search/photos/?client_id=9xB6KzPdxq603YtE7BwTp5OsWNjOrLPRsSw_4XWKW0A&query=`
let dest = destination;
const searchURL = `${API}${dest}`
let ind = Math.floor(Math.random() * 10)
return fetch(searchURL)
    .then((response) => response.json())
    .then((pics) =>  pics.results[ind].urls.small); // returns url
    
}

exports.GrabImage = GrabImage
exports.generateID = generateID