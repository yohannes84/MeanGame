
const { moduleHasNonRelativeName } = require("typescript");
const gamesData = require("../api/data/games.json")


//const objectid = require("mongodb").objectid; //added new 

//connecting to the database
//const dbConnect = require("../data/dbconnection")

module.exports.getAll = function(req,res){

    //this was there before my last update fro dbconnection
    console.log("Get all Games");
    console.log(req.query);
    //res.status(200).json(gamesData);

      //set pagination
      let offset = 0;
      //limit retun to 5 instead of all game list
      let count =5;
      if(req.query && req.query.offset){
          offset = parseInt(req.query.offset);/// query return a string and should be parsed to int
      }
      if(req.query && req.query.count){
          count = parseInt(req.query.count);//base 10 parseint more proper but can be ignored
      }
      const pageGames = gamesData.slice(offset,offset+count);
      res.status(200).json(pageGames)

    //   //new changes below for mongo to select all games from the mongo db
    //     const db = dbconnection.get()
    //     console.log("db",db);

    //     const gamesCollection = db.collection(process.env.DB_GAME_COLLECTION)

    //     gamesCollection.find().toArray().limit(count).toArray(function(err,games){
    //         console.log();
    //         res.status(200).json(games)
    //     })
}
module.exports.getOne = function(req,res){
    
    const gamedID =  req.params.gamedID;
    const theGame = gamesData[gamedID];
    console.log("Getting one game only by gameID: ", gamedID);
    res.status(200).send(theGame);

    //addition code added today
    // const db = dbconnection.get()
    // const gamesCollection = db.collection(process.env.DB_GAME_COLLECTION)

    // gamesCollection.findone().toArray().limit(count).toArray(function(err,games){
    //     console.log();
    //     res.status(200).json(games)
//});
}


// module.exports.addone = function(req,res){

//     //i need to test thos for json first before moving to the modno db

//     const db = dbconnection.get()
//     const gamesCollection = db.collection(process.env.DB_GAME_COLLECTION)
//    //force to accept title and price from user ..mongo dont care 
//     if(req.body && req.body.title && req.body.price){
//         console.log("the body is");

//         const ne Game = {
//             title : req.body.title,
//             price: req.body.price
//         }

//         gamesCollection.inserOne(newGame,function(err,insertedGame){
//             console.log("InsertOne",insertedGAME.OPS);
//             res.status(200)
//         })
//     }

// }
