const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const busHelpers=require('../adminHelpers/addbus')
//const bcrypt = require('bcrypt');
const routeSchema = new Schema({
    boardingPoint: String,
    destinationPoint: String,
    numberOfStops: Number,
    stops: [String], // Array of stop names
    busesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Bus' }], // Array of bus references
    totalFare:Number
    //newField: { type: Number, default: 0 } 
});


const route=mongoose.model('Route', routeSchema);


function addRoute(routeData){
    return new Promise(async(resolve,reject)=>{
        const newroute = new route();
        newroute.boardingPoint=routeData.boardingPoint;
        newroute.destinationPoint=routeData.destinationPoint;
        newroute.numberOfStops=routeData.numberOfStops;
        newroute.stops=routeData.stops;
        newroute.totalFare=routeData.totalFare;
        newroute.save();
        resolve(newroute);
    })
}

function findroutes(){
    return new Promise(async(resolve,reject)=>{
        const routes = await route.find().lean();
        resolve(routes);
    })
}

function incrementbuses(id,idBus){
    return new Promise(async(resolve,reject)=>{
        
        
        const updatedbuses = await route.findByIdAndUpdate(id, { $push: { busesEnrolled:  idBus} }, { new: true });

        resolve('success')


    })
}


function sortingroutes(boardingPoint,destinationPoint,datetobesearched){
    return new Promise(async(resolve,reject)=>{
        const routes = await route.find({
            stops: { $all: [boardingPoint, destinationPoint] }
          })

          const uniqueBusIds = new Set();

            // Loop through each route and add each bus ID to the Set
            routes.forEach(route => {
                route.busesEnrolled.forEach(busId => {
                    uniqueBusIds.add(busId);
                });
            });

            busidsfinal=Array.from(uniqueBusIds)

            

          resolve(busidsfinal)

       
        


    })
}

function findrou(id){
  return new Promise(async(resolve,reject)=>{
    console.log(id)
    const route_for_bus=await route.find({_id:id}).lean()
    console.log(route_for_bus)
    resolve(route_for_bus)
  })
}


function calculate_price(ticket,stops,ticketPrice){
    return new Promise(async(resolve,reject)=>{
        console.log(ticket)
        console.log(stops)
        console.log(ticketPrice)
        ticket.forEach(t => {
            let boardingIndex = stops.indexOf(t.boarding_point);
            let destinationIndex = stops.indexOf(t.destination);
            if (boardingIndex === -1 || destinationIndex === -1) {
                throw new Error("Invalid boarding or destination point");
            }
            let distance = Math.abs(destinationIndex - boardingIndex);
            
            // Calculate the price based on distance
            t.price = ticketPrice * distance;
            t.seat=destinationIndex
        });
        console.log(ticket)
        resolve(ticket)
    })
}
// async function sortingroutes(boardingPoint,destinationPoint){
//     const routes = await route.find({
//         stops: { $all: [boardingPoint, destinationPoint] }
//       })

//     console.log(routes)
// }

module.exports = {
    
    addRoute,
    findroutes,
    incrementbuses,
    sortingroutes,
    findrou,calculate_price
}


