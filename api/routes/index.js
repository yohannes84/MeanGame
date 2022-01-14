const express = require("express")
const router =  express.Router();
const gamesController = require("../../controllers/gamesController")

router.get("/", function(req,res){
    console.log("GET request Received");
    res.status(404).send("Received your GET request");
})

//getting all games
router.route("/games")
      .get(gamesController.getAll)
 
//getting one game
router.route("/games/:gamedID")
    .get(gamesController.getOne)

router.route("/json")
      .get(function(req,res){
            console.log("Json Request Received");
            res.status(200).send({"JSON_DATA":true})
        })
      .post(function(req,res){
            console.log("Json Request Received");
            res.status(200).send({"JSON_DATA":true})
        });

router.get("/file", function(req,res){
    console.log("Get file request");
    res.status(200).sendFile(path.join(__dirname,"app.js"))
})

module.exports = router;