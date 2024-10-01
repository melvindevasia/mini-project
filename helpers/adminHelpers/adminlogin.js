// var db=require('../../config/connection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    email: String,
    username: String,
    password: String,
   // verified: { type: Boolean, default: false } // Add the 'verified' field with default value false
  });
  

const admin=mongoose.model('Admin', adminSchema);

function register(userData){
    console.log(userData)
    return new Promise(async(resolve,reject)=>{
        
        userData.password=await bcrypt.hash(userData.password,10)
        const newadmin = new admin();
        newadmin.email=userData.email;
        newadmin.username=userData.username;
        newadmin.password=userData.password;
        newadmin.save();
        resolve(newadmin);
    })

}


function login(userdata){
    //console.log('admin',userdata)
    return new Promise(async(resolve,reject)=>{
        let response={};
        const eml=userdata.email;
        //console.log(eml)
        const psd=userdata.password;
        const filter={email:eml}
        const val=await admin.findOne(filter).exec();
        //console.log('res',val)
        if(val){
            //console.log(val)
            //console.log("inside condition")

            bcrypt.compare(psd, val.password, function(err, result) {
                if(result){
                    //console.log(val)
                    response.val=val;
                    response.status=true;
                    //console.log("successsssss")
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
  