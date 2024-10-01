
const mongoose = require('mongoose');


module.exports.connect=function(){
    mongoose.connect("mongodb://localhost:27017/journeysync");
    console.log("database connected");
}

