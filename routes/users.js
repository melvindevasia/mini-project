var express = require('express');
var router = express.Router();
const loginsignup=require('../helpers/registerandlogin/userlogin')
const bushelpers=require('../helpers/adminHelpers/addbus')
const routehelpers=require('../helpers/adminHelpers/addRoutes')
var stripe = require('stripe')
const tickethelpers=require('../helpers/tickethelpers')

/* GET users listing. */
require('dotenv').config();

let stripeGateway = stripe(process.env.stripe_api)
let DOMAIN = process.env.DOMAIN;

const verifyLogin=(req,res,next)=>{
  if(req.session.userloggedIn){
    next()
  }else{
    res.redirect('/users/login')
  }
}
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',(req,res)=>{
 loginsignup.login(req.body).then((response)=>{
  if(response.status){
    req.session.user= response.val
    console.log(response.val)
    req.session.userloggedIn=true
  }  
  res.redirect("/users/booking");
 })
})



router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup',(req,res)=>{
  loginsignup.register(req.body).then((response)=>{
    console.log(response)
  })
})

router.get('/booking', function(req, res, next) {
  res.render('homepage',{ user: true, layout: 'userLayout' });
});

router.post('/booking',verifyLogin, function(req, res, next) {
  console.log(req.body)
  routehelpers.sortingroutes(req.body.from,req.body.to,req.body.date).then((response)=>{
    console.log(response)
    bushelpers.buslist(response,req.body.date).then((response)=>{
      res.render('viewtouser',{ user: true, layout: 'userLayout' ,buses:response})
    })
  })
});

router.get('/knowbus', function(req, res, next) {
  const x=''
  bushelpers.findbus(req.query.id).then((response)=>{
    routehelpers.findrou(response[0].routeid).then((routeresponse)=>{
      console.log('route',routeresponse)
      console.log('bus',response)
      res.render('busKnowmorepage',{bus:response[0],route:routeresponse[0]})
    })


  })
 // res.render('busknowmore',{})
});


router.get('/view-availableseats', function(req, res, next) {
  console.log(req.query.id)
  bushelpers.findbusseat(req.query.id).then((response)=>{
    req.session.busstop=response
    console.log(response)
    routehelpers.findrou(response.routeid).then((responseforroute)=>{
      req.session.routestops=responseforroute[0]
      console.log('ggg')
      console.log(req.session.routestops)
      x=responseforroute[0].stops.length-1
      console.log(x)
      
      res.render('seatbooking',{ seat_booking:response.seat_booking,final:x });
    })
  })
  
});

router.post("/stripe-checkout", async (req, res) => {
  const booking = req.body;
  console.log(booking);

  try {
      const session = await stripeGateway.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          success_url: `${process.env.DOMAIN}/users/success`,
          cancel_url: `${process.env.DOMAIN}/users/cancel`,
          line_items: booking.tickets.map(ticket => ({
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: `Ticket from ${ticket.boarding_point} to ${ticket.destination}`
                  },
                  unit_amount: ticket.price * 100 // amount in cents
              },
              quantity: 1
          })),
          metadata: {
              userId: req.session._id // Add user ID as metadata
          }
      });

      res.json({ url: session.url });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while creating Stripe Checkout session.' });
  }
});

router.get('/sample',(req,res)=>{
  routehelpers.sortingroutes('kollam','pala','19-06-2024').then((response)=>{
    console.log(response)
    bushelpers.buslist(response,'2024-06-19').then((response)=>{
      res.render('viewtouser',{ user: true, layout: 'userLayout' ,buses:response})
    })
  })
})

router.get('/success',(req,res)=>{
  console.log('sessions')
  console.log(req.session.summary)
  console.log(req.session.totalPrice)

  tickethelpers.createTicket(req.session.summary,req.session.totalPrice,req.session.routestops._id).then((response)=>{
    console.log(response)
    const indicesToUpdate = req.session.summary.map(ticket => parseInt(ticket.seat_no) ); // Adjust for 0-based indexing
    const newValues = req.session.summary.map(ticket => ticket.seat);
    console.log(indicesToUpdate)
    console.log(newValues)
    bushelpers.updateSeatBooking(req.session.busstop._id,indicesToUpdate,newValues).then((responseforseatupdate)=>{
      console.log(responseforseatupdate)
      console.log(response.price)
      console.log(response.tickets)
       res.render("viewmyticket",{tickets:response.tickets,price:response.price})
    })
  })
 
})

router.get('/bus_ticket',(req,res)=>{
  
 
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/users/login')
})

// router.get('/book-now',(req,res)=>{
//   console.log(req.body)
//   res.render('book-now')
// })


router.post('/book-now', (req, res) => {
  const selectedSeats = JSON.parse(req.body.selectedSeats);

  // Check if req.session.routestops exists and has the expected structure
  if (req.session.routestops && req.session.routestops.stops) {
    const routes_that_bus_travels = req.session.routestops.stops;
    console.log(routes_that_bus_travels);

    // Transform selectedSeats
    let transformedSeats = selectedSeats.map(item => {
      let seat_no = Object.keys(item)[0];  // Extracting the seat number as string
      let seat_value = item[seat_no];      // Extracting the seat value

      // Calculate stops_available
      let stops_available = routes_that_bus_travels.slice(seat_value);

      return { seat_no: parseInt(seat_no), seat_value, stops_available };  // Creating new object
    });

    console.log(transformedSeats);

    // Render the view with transformedSeats
    res.render('book-now', { seats: transformedSeats,stops_available: routes_that_bus_travels,st:req.session.routestops,total_fare:1000});
  }
});


router.post('/know-price', (req, res) => {
  console.log(req.body)
  const { seat_no, seat, destination } = req.body;
  
  if (!seat_no || !seat || !destination) {
    return res.status(400).send('Invalid input');
  }
  
  // Ensure all arrays have the same length
  const length = seat_no.length;
  if (seat.length !== length || destination.length !== length) {
    return res.status(400).send('Array lengths do not match');
  }

  // Create an array of objects
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push({
      seat_no: seat_no[i],
      boarding_point: seat[i],
      destination: destination[i]
    });
  }
  
  routehelpers.calculate_price(result,req.session.routestops.stops,req.session.busstop.fare).then((response)=>{
    console.log('hi')
    console.log(response);
    req.session.summary=response
    const totalPrice = response.reduce((sum, ticket) => sum + ticket.price, 0);
    console.log(totalPrice)
    req.session.totalPrice=totalPrice
    res.render('displayprice', { tickets:response,totalPrice:totalPrice });
  })

  
  
});

module.exports = router;
