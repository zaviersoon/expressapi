let mongoose = require("mongoose")

// Use mongoose to initialize schema
let mongoSchema = mongoose.Schema

// Use mongoSchema to create reference to song collection
let songSchema = new mongoSchema({
      "videoid": String,
      "likes": Number,
      "dislikes": Number
}, {
    collection : "songs"
})

// Export the model
module.exports = mongoose.model('songs', songSchema)