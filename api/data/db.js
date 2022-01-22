require("./games-model.js")
const mongoose =   require("mongoose")
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose Connected to " + process.env.DB_NAME);
})

mongoose.connection.on ("disconnected", function(){
    console.log("Mongoose disconnected");
})

mongoose.connection.on ("error", function(err){
    console.log("Mongoose connection error "+ err);
})

//signal interupt
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0)
    })
})
//signal termination
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0)
    })
})

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid,"SIGUSR2")
    })
})