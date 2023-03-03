// Import express from node_module
// http://localhost:8080

const { response, request } = require('express')
let express = require('express')
let mongoose = require('mongoose')
const songs = require('./songs')
let song = require('./songs')

// Create express app
let app = express()

// Configure express app
app.use(express.json())

// Use mongoose to connect to database
let connectionString = "mongodb+srv://mongo-user:mongopassword@cluster0.ixphzfq.mongodb.net/youtube"
mongoose.connect(connectionString)

let db = mongoose.connection

db.once('open', ()=>{
    console.log("Connection to mondoDB in cloud is success!!!")
})




// Create root endpoint
// app.get(endpoint, callback)
// endpoint => /, /todos/ get/friends/all
// callback ->(incoming request, outgoing response) =>{}
app.get("/", (request, response)=>{
    console.log("Request Received...")
    console.log(request.url)
    response.send("<h1>Help from Server!</h1>")
})

app.get("/welcome", (request, response)=>{
    console.log("Request Received..GET.")
    console.log(request.url)
    response.send("<h1>Welcome to Express API!</h1>")
})

// GET
app.get("/help", (request, response)=>{
    console.log("Request Received...")
    console.log(request.url)
    // response.send("<h1>Help from Server!</h1>")
    response.json({
        status : "Success",
        request_type : "GET",
        message : "Send email to Zavier",
        meaning : "I will retrieve the list of data from the server"
    })
})

app.get("/showrequest", (request, response)=>{
    console.log("Request Received...GET")
    console.log("*****Request start*****")
    console.log(request)
    console.log("*****Request ends*****")
    response.send("<h1>See Request object in JSON in server console!</h1>")
})

// POST
app.post("/help", (request, response)=>{
    console.log("Request Received...POST")
    // console.log(request)
    console.log(request.body)
    console.log(request.body.name)
    console.log(request.body.location)
    console.log(request.url)
    response.json({
        status : "Success",
        request_type : "POST",
        message : "Send Email to Zavier",
        meaning : "I will add a new data to the server"
    })
})

// PUT
app.put("/help", (request, response)=>{
    console.log("Request Received...POST")
    console.log(request.url)
    response.json({
        status : "Success",
        request_type : "PUT",
        message : "Send Email to Zavier",
        meaning : "I will update a data on the server"
    })
})

// DELETE
app.delete("/help", (request, response)=>{
    console.log("Request Received...POST")
    console.log(request.url)
    response.json({
        status : "Success",
        request_type : "DELETE",
        message : "Send Email to Zavier",
        meaning : "I will dalete a data from the server"
    })
})

// Get data from mondodb database
// http://localhost:8080/get/all/songs
app.get("/get/all/songs", (request, response)=>{
    // use song reference/model in line 4 to interact with 
    // song collection in mongodb database
    song.find({})
    .then((data)=>{
        response.json(data)
    })
    .catch((error)=>{
        response.json(error)
    })
})

// http://localhost:8080/add/songs
app.post("/add/songs",(request, response)=>{
    console.log("Request body received from fronted")
    console.log(request.body)
    let newSong = new song()
    console.log(newSong)
    newSong.videoid = request.body.videoid
    newSong.likes = request.body.likes
    newSong.dislikes = request.body.dislikes
    console.log(newSong)
    // insert new song to mongodb
    newSong.save()
    .then((data)=>{
        response.json({
            "message" : "Success",
            "status" : data
        })
    })
    .catch((error)=>{
        response.json(error)
    })
})


// http://localhost:8080/remove/songs/64009e3b69dcba412f06f0fe
app.delete("/remove/songs/:myid", (request, response)=>{
    console.log("Remove one document from song collection....")
    console.log("id: " + request.params.myid)
    // use myid to find and remove song from mongodb
    song.findByIdAndDelete(request.params.myid)
    .then((data)=>{
        response.json(data)
    })
    .catch((error)=>{
        response.json(error)
    })
})

// http://localhost:8080/update/song/64009e3b69dcba412f06f0fe
app.put("/update/songs/:id", (request, response)=>{
    // Receive path variable
    console.log("id :" + request.params.id)
    // console.log(`id received: ${request.params.id}`);
    console.log("Request body received....");
    console.log(request.body);

    // let songUpdate = new song()
    // console.log(songUpdate)
    // songUpdate.videoid = request.body.videoid
    // songUpdate.likes = request.body.likes
    // songUpdate.dislikes = request.body.dislikes
    // console.log(songUpdate)
    // Update song collection for mongodb
    song.updateOne({_id: request.params.id},
                        {
                            $set:{
                                videoid : request.body.videoid,
                                likes:request.body.likes,
                                dislikes:request.body.dislikes
                            }
                        })
    .then((data)=>{
        response.json(data)
    })
    .catch((error)=>{
        response.json(error)
    })
})



// Define port for API
let PORT = 8080

// Listen on port
app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})