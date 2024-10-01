const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');
const routehelpers=require('../adminHelpers/addRoutes')
const busSchema = new Schema({
    busregno: String,
    busid: String,
    busname: String,
    bustype:String,
    seats:Number,
    seat_booking: [Number]
  ,
    boardingdate:Date,
    endingdate:Date,
    routeid:{ type: Schema.Types.ObjectId, ref: 'Route' },
   assigned: { type: Boolean, default: false },
   fare:{ type: Number, default: 0 } 
  });

  const bus=mongoose.model('Bus', busSchema);

  function registerbus(busData){
    //console.log(userData)
    return new Promise(async(resolve,reject)=>{
        var x=[];
       // userData.password=await bcrypt.hash(userData.password,10)
        const newbus = new bus();
        newbus.busregno=busData.busRegNo;
        newbus.busid=busData.busId;
        newbus.busname=busData.busName;
        newbus.bustype=busData.busType;
        newbus.seats=busData.seat;

        for (let i = 0; i < busData.seat; i++) {
            x[i]=0
        }
        newbus.seat_booking=x


        newbus.save();
        resolve(newbus);
    })

}

function findfbuses(){
    return new Promise(async(resolve,reject)=>{
        const buses = await bus.find().lean();
        resolve(buses);
    })
}


function findavailablebuses(){
    return new Promise(async(resolve,reject)=>{
        const buses = await bus.find({assigned:false}).lean();
        resolve(buses);
    })
}


function enroll_bus(id,routeid,enrolldata){

    return new Promise(async(resolve,reject)=>{
  
      const updatedbus = await bus.findByIdAndUpdate(id, {
        $set: {
            boardingdate:enrolldata.boarding_date,
            endingdate:enrolldata.ending_date,
            assigned:true,
            fare:enrolldata.totalFare,
            routeid:routeid
        }
      }, { new: true });

      routehelpers.incrementbuses(routeid,id).then((response)=>{
        resolve(updatedbus)

      })
  
      
  
  })
  }

function buslist(list,dateToCheck){
    return new Promise(async(resolve,reject)=>{
        const date = new Date(dateToCheck);
        console.log(date)
        //const mongooseIds = list.map(id => mongoose.Types.ObjectId(id));
console.log(list[0])
        // Query MongoDB to find buses with matching IDs
        const matchingBuses = await bus.find({
            _id: { $in: list },
            boardingdate: date
        }).lean();

        console.log('gsss',matchingBuses)

        resolve(matchingBuses)
    })
}

function findbus(id){
    return new Promise(async(resolve,reject)=>{
        const buses = await bus.find({_id:id}).lean();
        resolve(buses)
    })
}
  
function findbusseat(id){
    return new Promise(async(resolve,reject)=>{
        const buses = await bus.findById(id).select('seat_booking routeid fare').lean();
        resolve(buses)
    })
}
function updateSeatBooking(busId, indicesToUpdate, newValues) {
    return new Promise(async (resolve, reject) => {
        const buses = await bus.findById(busId);

        if (!buses) {
            throw new Error(`Bus with id ${busId} not found`);
        }

        // Update each index in the seat_booking array
        indicesToUpdate.forEach((index, i) => {
            buses.seat_booking[index] = newValues[i];
        });

        // Save the updated bus document
        const updatedBus = await buses.save();
        resolve(updatedBus)
    })
}


module.exports = {
    registerbus,
    findfbuses,
    findavailablebuses,
    enroll_bus,
    buslist,bus,
    findbus,
    findbusseat,
    updateSeatBooking
    
}