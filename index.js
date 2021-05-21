require('dotenv').config()

let {destinations} = require('./db')
const express = require('express')
const axios = require('axios').default;
// const cors = require('cors')
const {generateID, GrabImage} = require('./services');

const API_KEY = process.env.API_KEY
const PORT =  process.env.PORT;
const app = express()

//Middleware
app.use(express.json())
// app.use(cors())


app.listen(PORT, () =>{
    console.log(`Connected & listening on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send("<h1>Brian's App</h1>")
});

app.get('/destinations', (req, res) => {
    res.send(destinations)
})

// Post new objects via /destinations route
app.post('/destinations', async (req, res) =>{
 
// const {name, location, photo, description} = req.body
    const {name, location, description} = req.body
    const photo = await GrabImage(name, location)

    // const url = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${name}`
    // let ind = Math.floor(Math.random() * 10)
//test Axios Method
//     let newPhoto = ""
//    await axios.get(url).then(resp => {
//         newAxiosPhoto = resp.data.results[ind].urls.small
//     });
//         console.log(`NEW Axios PHOTO ${newAxiosPhoto}`);

    if (name === undefined || name.length === 0 || location === undefined || location.length === 0){
    return res.status(400).send("Error need destination name & location")
}

    console.log(name, location, photo, description);     
    destinations.push({
        id: generateID(),
        name: name, 
        location: location,
        photo: photo, 
        description: description ? description : ""
    })
    res.send("Post Request Sent")
  
})

//Delete objects via destination route, can only use name as parameter

app.delete('/destinations/:id', (req,res) => {
    let deleteID = req.params.id
    let filter = destinations.filter((id) => { 
       if ( id.id !== deleteID) {
           return true;
    }})
    destinations = filter;
    res.send(`deleted ${deleteID}`)
})

//Edit objects via destination route through 'query'


app.put("/destinations/:id", async (req, res) =>{
    const {id} = req.params
    const {name, location,  description} = req.body


    if (!name && !location && !photo && !description){
        return res.status.send('No data to update')
    }

    for (let dest of destinations) {
        if (dest.id === id) {
        const photo = await GrabImage(name, location)    
        dest.name = name ? name : dest.name
        dest.location = location ? location : dest.location
        dest.photo = photo ? photo : dest.photo
        dest.description = description ? description : dest.description
        console.log(`${dest.name} | ${dest.location} | ${dest.photo} | ${dest.description} updated`);
            break;
        }
    }
    res.send('PUT request updated')
})