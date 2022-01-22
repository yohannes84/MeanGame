const express = require("express")
const router =  express.Router();
const gamesController = require("../../controllers/gamesController")
const publisher = require("../../controllers/publisher")

router.get("/", function(req,res){
    console.log("GET request Received");
    res.status(404).send("Received your GET request");
})

//getting all games
router.route("/games/")
      .get(gamesController.getAll)
      .post(gamesController.addOne)
 
//getting one game
router.route("/games/:gameID")
    .get(gamesController.getOne)
    .put(gamesController.fullUpdateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.deleteOne)

router.route("/games/:gameID/publisher/")
    .get(publisher.getAll)
    .post(publisher.addOne)
    

router.route("/games/:gameID/publisher/publisherId")
    .get(publisher.getOne)
    .delete(publisher.deleteOne)
    .put(publisher.fullUpdateOne)
    .patch(publisher.partialUpdateOne)

module.exports = router;