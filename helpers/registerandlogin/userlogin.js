// var db=require('../../config/connection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
   // verified: { type: Boolean, default: false } // Add the 'verified' field with default value false
  });
  

const user= mongoose.model('User', userSchema);

function register(userData){
    console.log(userData)
    return new Promise(async(resolve,reject)=>{
        
        userData.password=await bcrypt.hash(userData.password,10)
        const newuser = new user();
        newuser.email=userData.email;
        newuser.username=userData.username;
        newuser.password=userData.password;
        newuser.save();
        resolve(newuser);
    })

}


function login(userdata){
    return new Promise(async(resolve,reject)=>{
        let response={};
        const eml=userdata.email;
        const psd=userdata.password;
        const filter={email:eml}
        const val=await user.findOne(filter).exec();
        if(val){

            bcrypt.compare(psd, val.password, function(err, result) {
                if(result){
                    //console.log(val)
                    response.val=val;
                    response.status=true;
                    resolve(response)
                }else{
                    console.log("wrong password");
                    resolve({status:false})
                }
            });
        }
        else{
           //console.log("seen");
           resolve({status:false})
        }
    }
    )
}


module.exports = {
    register,
    login
    
}
  