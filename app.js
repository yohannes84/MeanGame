require("dotenv").config();
const express = require("express");
const routes = require("./api/routes")
const path = require("path")
const app = express();


app.set("port", process.env.PORT)


app.use(function(req,res,next){
    console.log(req.method,req.url)
    next();
});

app.use(express.static(path.join(__dirname,"public")))

app.use("/api",routes)

const server =  app.listen(app.get("port"), function(){
    console.log("Listhening on Port: ", server.address().port)

});
