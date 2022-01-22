const res = require("express/lib/response");
const mongoose = require("mongoose")
const Game = mongoose.model(process.env.DB_GAME_MODEL)

const getAll = function(){
    console.log("get all reviews controller")
    const gameID =req.params.gameID;
    Game.findById(gameID).select("reviews").exec(function(err,game){
        console.log("found publisher", game.reviews,"for game",game);
        res.status(200).json(game.reviews)
    })
}

const getOne = function(){
    console.log("get one reviews controller")
    const gameID =req.params.gameID;
    const reviewID = req.params.reviewID
    Game.findById(gameID).select("reviews").exec(function(err,game){
        console.log("found reviews", game.reviews,"for game",game);
        res.status(200).json(game.reviews.id(reviewID))
    })
}

module.exports = {
    getOne
}