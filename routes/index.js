var express = require('express');
var router = express.Router();
var adhhelpers=require('../helpers/adminHelpers/adminlogin')
var bushelpers=require('../helpers/adminHelpers/addbus')
var routehelpers=require('../helpers/adminHelpers/addRoutes')
const verifyLogin=(req,res,next)=>{
  if(req.session.adminloggedIn){
    next()
  }else{
    res.redirect('/admin/login')
  }
}
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('adminLogin')
});

router.get("/",verifyLogin,(req,res)=>{
  res.render("admin")
})

router.post('/login',(req,res)=>{
  console.log(req.body)
  adhhelpers.login(req.body).then((response)=>{
    if(response.status){
      req.session.admin= response.val
      console.log(response.val)
      req.session.adminloggedIn=true
    }
    res.redirect('/admin')  
  })
})


router.get('/signup', function(req, res, next) {
  res.render('adminsignup');
});

router.post('/signup',(req,res)=>{
  adhhelpers.register(req.body).then((response)=>{
    console.log(response)
  })
})

router.get('/routes',verifyLogin, function(req, res, next) {
  
  routehelpers.findroutes().then((response)=>{
    console.log(response)
    res.render('adminRoutes',{routes:response});
  })
});


router.get('/enroll',verifyLogin, function(req, res, next) {
  req.session.adminRoute=req.query.id
  req.session.busfare=req.query.fare
  console.log(req.session.busfare)
  console.log(req.session.adminRoute)
  bushelpers.findavailablebuses().then((response)=>{
    console.log(response)
    res.render('availbuses',{buses:response});
  })
});

router.get('/buses',verifyLogin, function(req, res, next) {
  bushelpers.findfbuses().then((response)=>{
    console.log("hey")
    console.log(response)
    res.render('adminBuses',{buses:response});
  })
  
});


router.get('/reservation',verifyLogin, function(req, res, next) {
  res.render('adminReservation');
});


router.get('/adminUsers',verifyLogin, function(req, res, next) {
  res.render('adminUsers');
});

router.get('/feedback',verifyLogin, function(req, res, next) {
  res.render('adminfeedback');
});

router.post('/buses',(req,res)=>{
  console.log('hi')

  bushelpers.registerbus(req.body).then((response)=>{
    console.log(response)
    res.status(200).json({ message: "Bus added successfully" });

    //res.redirect('/admin')

  })

console.log(req.body)

})

router.get('/add-route',verifyLogin, function(req, res, next) {
  res.render('add-route');
});

router.post('/add-route',verifyLogin, function(req, res, next) {
  console.log(req.body)
  routehelpers.addRoute(req.body).then((response)=>{
    console.log(response)
  })

  res.status(200).json({ message: "Bus added successfully" });
});


router.get('/enroll-bus',verifyLogin, function(req, res, next) {
  req.session.bus_id_for=req.query.id
  res.render('enroll-formbus')
});


router.post('/enroll-bus',verifyLogin, function(req, res, next) {
  console.log(req.body)
  bushelpers.enroll_bus(req.session.bus_id_for,req.session.adminRoute,req.body).then((response)=>{
    console.log(response)
  })
});


module.exports = router;
