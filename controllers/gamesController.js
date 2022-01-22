
const dbconnection = require("../api/data/dbconnection");
const ObjectId = require("mongodb").ObjectId
const gamesData = require("../api/data/games.json")
const mongoose =   require("mongoose")
const Game = mongoose.model(process.env.DB_GAMES_MODEL)

//complete
const getAll = function (req, res) {

    //set pagination
    let offset = 0;
    //limit retun to 5 instead of all game list
    let count = 5;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT ,10)

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);/// query return a string and should be parsed to int
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);//base 10 parseint more proper but can be ignored
    }

    if (isNaN(offset)||isNaN(count)){
        log("offset || count are not numbers")
        res.status(400).json({"message":"quwrying offset and count shoud be digits"})
        return;
    }

    if (count>maxCount){
        log("count is greater than max limit")
        res.status(400).json({"message":"cannot exceed count limit of "+ maxCount})
        return
    }

  //can add skip(offset).limit(count) or with out -returning all the games not advisable ib large scale application
    Game.find().exec(function(err,games){
        if(err){
            console.log("Error: finding games");
            res.status(500).json(err)
        }else{
            console.log("Found games", games.length);
            res.status(200).json(games)
        }
        
    })
}

//complete
const getOne = function (req, res) {

    const gameID = req.params.gameID;

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({"message":"Game ID must be a valid ID"})
    }

    Game.findById(gameID).exec(function(err,game){

        const response = {
            status :200,
            message: game
        }
        if(err){
            console.log("Error finding game");
            response.status = 500
            response.message = err
        }else if(!game){
            console.log("the requsting game ID not found");
            response.status = 400
            response.message = {"message":"Game ID not found"}
        }
       
            res.status(response.status).json(response.message)
    
    })
    

}

//complete
const addOne = function (req, res) {

    console.log("POST add new game request");

    const newGame = {
        title:req.body.title,
        year:req.body.year,
        rate:req.body.rate,
        price:req.body.price,
        miniPlayers:req.body.miniPlayers,
        maxPlayers:req.body.maxPlayers,
        minAge:req.body.minAge,
        designers:[req.body.designers],
        publisher:{name:"noname"},
        reviews:[]
    }

    Game.create(newGame, function(err, game){
        const response = {
            status:201,
            message:game
        }

        if(err){
            console.log("error creating new game");
            response.status =500;
            response.message = err;
        }

        res.status(response.status).json(response.message);
    })

   
}

//complete
const deleteOne = function (req, res) {
   
    console.log("Delete game request received");
    const gameID = req.params.gameID;

    if (!mongoose.isValidObjectId(gameID)) {
        console.log("Request params tourId is not a valid ID");
        res.status(400).json({ "message": "Game ID must be a valid ID" })
    }

    Game.findByIdAndDelete(gameID).exec(function (err, deletedGame) {
        const response = { status: 204, message: deletedGame }
        if (err) {
            console.log("Error: finding game");
            response.status = 500
            response.message = err
        } else if (!deletedGame) {
            console.log("Game id not found");
            response.status = 404
            response.message = { "message": "Game ID not found" }
        }

        res.status(response.status).json(response.message)
    });

};


//...............................UPDATE.............................................................

const _updateOne = function (req, res, updateGameCallback) {
    console.log("Update One Game Controller");
    const gameID = req.params.gameID
    if(!mongoose.isValidObjectId(gameID)){
        console.log("the gameId is not a valid object");
        res.status(400).json({"message":"game must be a valid object"})
        return
    }
    Game.findById(gameID).exec(function (err, game) {
        const response = { status: 204, message: game };
        if (err) {
            console.log("Error finding game");
            response.status = 500
            response.message = err
        } else if (!game) {
            console.log("Game id not found");
            response.status = 404
            response.message = { "message": "Game ID not found" }
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        } else {
            updateGameCallback(req, res, game, response)
        }

    })
}

const fullUpdateOne = function (req, res) {
    console.log("Full Update One Game Controller");
    gameUpdate = function (req, res, game, response) {
        game.title = req.body.title
        game.year = req.body.year
        game.rate = req.body.rate
        game.price = req.body.price
        game.minPlayers = req.body.minPlayers
        game.maxPlayers = req.body.maxPlayers
        game.minAge = req.body.minAge
        game.designers = req.body.designers

        if (req.body.name) {
            console.log("Name passed");
            game.publisher = { name: req.body.name }
        } else {
            console.log("No Name passed");
            game.publisher = { name: "NoName" }
        };
        game.reviews = []
        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500
                response.message = err
            }else {
                response.status = 201
                response.message = updatedGame.publisher
            }
            res.status(response.status).json(response.message)

        })

    }
    _updateOne(req, res, gameUpdate)
}

 const partialUpdateOne = function (req, res) {

    console.log("Partial Update One Game Controller");
    gameUpdate = function (req, res, game, response) {
        if (req.body.title) { game.title = req.body.title }
        if (req.body.year) { game.year = req.body.year }
        if (req.body.rate) { game.rate = req.body.rate }
        if (req.body.price) { game.price = req.body.price }
        if (req.body.minPlayers) { game.minPlayers = req.body.minPlayers }
        if (req.body.maxPlayers) { game.maxPlayers = req.body.maxPlayers }
        if (req.body.minAge) { game.minAge = req.body.minAge }
        if (req.body.designers) { game.designers = req.body.designers }
        if (req.body.publisher) { game.publisher = req.body.publisher }
        if (req.body.reviews) { game.reviews = req.body.reviews }

        game.save(function (err, updatedGame) {
            if (err) {
                response.status = 500
                response.message = err
            }else {
                response.status = 201
                response.message = updatedGame.publisher
            }
            res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, gameUpdate)

}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}
