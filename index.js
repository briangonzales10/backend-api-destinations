let {destinations} = require('./db')
const express = require('express')
const {generateID} = require('./services')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true })); 

app.listen(3000, () =>{
    console.log('Connected & listening on port 3000');
})

app.get('/destinations', (req, res) => {
    res.send(destinations)
})

// Post new objects via /destinations route
app.post('/destinations', (req, res) =>{

const {name, location, photo, description} = req.body

if (name === undefined || name.length === 0 || location === undefined || location.length === 0){
    return res.status(400).send("Error need destination name & location")
}
    console.log(name, location, photo, description);    
    destinations.push({
        id: generateID(),
        name: name, 
        location: location,
        photo: photo ? photo : "", 
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

