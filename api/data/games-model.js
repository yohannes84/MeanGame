const { stringify } = require("mocha/lib/utils")
const mongoose =   require("mongoose")

const reviewSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    review:{
        type: String,
        required:true
    },

    postDate:{
        type:Date,
        "default":Date.now
    }
})

const publisherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:String,
    established:Number,
    localtion:{
        coordinates:{
            type:[Number],//we store long(east/west) then latitude(north/south)
            index:"2dsphere"
        }
    }
})
const gameSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:Number,
    rate:
    {
        type:Number,
        min:1,
        max:5,
        "default":1
    },

    minPlayers:
    {
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    minAge:Number,
    designers:[String],
    publisher:publisherSchema,
    reviews:[reviewSchema]
})

mongoose.model(process.env.DB_GAMES_MODEL, gameSchema,"games");//colection name will be games or make it explicit by gibing it a name