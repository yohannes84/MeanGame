const res = require("express/lib/response");
const mongoose = require("mongoose")
const Game = mongoose.model(process.env.DB_GAMES_MODEL)

//complete
const getAll = function (req, res) {
    console.log("Opertaor Get One Request Received");
    const gameID = req.params.gameID

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Request params gameID is not a valid ID");
        res.status(400).json({"message":"Game ID must be a valid ID"})
    }

    Game.findById(gameID).select("publisher").exec(function (err, game) {
        if (err) {
            console.log("Error: finding game");
            res.status(500).json(err)
        } else if (!game) {
            console.log("Game ID not found");
            res.status(404).json({ "message": "Game ID not found" })
        } else {
            console.log("Found publisher");
            res.status(200).json(game.publisher)
        }


    })
}

//complete
const getOne = function(){
    console.log("Publisher get one request received");
    const gameID = req.params.gameID;
    const publisherId = req.params.publisherId

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Request params gameID is not a valid ID");
        res.status(400).json({"message":"Game ID must be a valid ID"})
    }

    if(!mongoose.isValidObjectId(publisherId)){
        console.log("Request params publisherId is not a valid ID");
        res.status(400).json({"message":" Publisher ID must be a valid ID"})
    }

    Tour.findById(gameID).select("publisher").exec(function (err, game) {

        const response = {
            status :200,
            message: tour
        }

        if (err) {

            console.log("Error finding game");
            response.status = 500
            response.message = err

        } else if (!game) {
            console.log("the requsting game ID not found");
            response.status = 404
            response.message = {"message":"game ID not found"}
        } else if (!game.publisher) {
            console.log("the requsting publisher ID not found");
            response.status = 404
            response.message = {"message":"publisher ID not found"}
        } else {
            console.log("Publisher found");
            res.status(200).json(game.publisher.id(publisherId))
        }

    })
}

const _addPublisher = function(req,res,game){
    game.publisher = {
        name:req.body.name,
        country:req.body.country,
        established:req.body.established,
        coordinates:[parseFloat(req.body.lng),parseFloat(req.body.lat)]
    }

    game.save(function(err,updatedGame){
        const response = {
            status : 200,
            message:updatedGame
        }

        if(err){
            response.status = 500
            response.message = err
        }else{
            response.status = 201
            response.message = updatedGame.publisher
        }

        res.status(response.status).json(response.message)

    })
}

//complete
const addOne = function(req,res){
    console.log("Publsiher add request received")
    const gameID = req.params.gameID;

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Request params gameID is not a valid ID");
        res.status(400).json({"message":"Game ID must be a valid ID"})
    }

    Game.findById(gameID).select("publisher").exec(function(err,game){

        const response = {
            status:201,
            message:game.publisher
        }

        if(err)
        {
            response.status = 500
            response.message = err
        }else if(!game){
            response.status = 404;
            response.message ={"message":"GameID not found"+gameID}
        }

        if(game){
            _addPublisher(req,res,game)
        }else{
            console.log("found publisher", game.publisher,"for game",game);
            res.status(response.status).json(response.message)
        }
        
    })
}

const _deleteOperator = function (req, res, game) {

    publisher = { name: "NoName", rating: 0 };

    //tour.operator.pop(operator)
    game.save(function (err, updatedGame) {
        const response = { status: 204, message: [] }
        if (err) {
            response.status = 500
            response.message = err
        } else {
            response.status = 201
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message)

    })

}
//complete
const deleteOne = function (req, res) {

    console.log("Publisher delete one request received");
    const gameID = req.params.gameID;

    if(!mongoose.isValidObjectId(gameID)){
        console.log("Request params gameID is not a valid ID");
        res.status(400).json({"message":"Game ID must be a valid ID"})
    }

    Game.findById(gameID).select("publisher").exec(function (err, game) {
        
        const response = { status: 201, message: game }
        if (err) {
            console.log("Error: finding game");
            response.status = 500;
            response.message = err
        } else if (!game) {
            console.log("Error: finding game");
            response.status = 404;
            response.message = { "message": "Error: finding game" + gameID }
        }
        if (game) {
            _deleteOperator(req, res, game)
        } else {
            res.status(response.status).json(response.message)
        }


    })
}

//..................................PUBLISHER UPDATE...........................................

const _updateOne = function (req, res, publisherUpdateCallback) {
    console.log("Update One publsiher Controller");
    const gameID = req.params.gameID
    if(!mongoose.isValidObjectId(gameID)){
        console.log("the gameId is not a valid object");
        res.status(400).json({"message":"game must be a valid object"})
        return
    }
    Game.findById(gameID).select("publisher").exec(function (err, game) {
        console.log("Found publisher ", game.publisher , " for Game ",game)
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
            publisherUpdateCallback(req, res, game, response)
        }

    })
}

const _fullPublisherUpdate = function (req, res,game) {
    console.log("Full Update One Game Controller");
        game.publisher.name= req.body.name;
        game.publisher.country = req.body.country
        game.publisher.established = req.body.established
        game.publisher.location.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)]
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
   


 const _partialPublisherUpdate = function (req, res,game) {

    console.log("Partial Update One Game Controller");
        if (req.body.name) {game.publisher.name= req.body.name;}
        if ( req.body.country ){game.publisher.country = req.body.country}
        
        if ( req.body.established ){game.publisher.established = req.body.established}
        
        if ( req.body.lng && req.body.lat ){
        game.publisher.location.coordinates = [parseFloat(req.body.lng ),parseFloat(req.body.lat)]
        }
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
    
const fullUpdateOne = function(req, res){
    console.log("Full Update One", req.body)
    _updateOne (req, res, _fullPublisherUpdate)
}
    
const partialUpdateOne = function(req, res){
    console.log("Partial Update One", req.body)
    _updateOne (req, res, _partialPublisherUpdate)
}
   



module.exports = {
    getOne:getOne,
    addOne:addOne,
    getAll:getAll,
    deleteOne:deleteOne,
    fullUpdateOne,
    partialUpdateOne

}