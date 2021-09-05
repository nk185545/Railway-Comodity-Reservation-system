const express = require("express") ;
const path = require("path") ;
const hbs = require("hbs") ;
const app = express() ;
const port = process.env.PORT || 8000 ;
let alert=require('alert')

var localStorage = require("localStorage")

const bodyParser = require('body-parser');
const {Registerlist , Trainlist, Cargolist}= require("./connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//public static path
const staticPath = path.join(__dirname, "../public") ;
const template_path = path.join(__dirname, "../templates/views") ;
const partials_Path = path.join(__dirname, "../templates/partials") ;

app.set("view engine","hbs") ;
app.set("views",template_path)

// hbs register partials
hbs.registerPartials(partials_Path) ;

app.use(express.static(staticPath)) ;

//var storeuname = "";
//var storetnum = 0;


//routing
app.get("",(req,res)=> {
    res.render('index')
}) ;

app.get("/about",(req,res)=> {
    res.render('about')
}) ;

app.get("/login",(req,res)=> {
    res.render('login')
}) ;
app.get("/AdminLogin",(req,res)=> {
    res.render('AdminLogin')
}) ;
app.get("/UserLogin",(req,res)=> {
    res.render('UserLogin')
}) ;
app.get("/userlogout",(req,res)=> {
    //storeuname="";
    localStorage.setItem("storeuname","") ;
    res.render('UserLogin')
}) ;
app.get("/UserSignUp",(req,res)=> {
    res.render('UserSignUp')
}) ;
app.get("/Contact",(req,res)=> {
    res.render('Contact')
}) ;
app.get("/services",(req,res)=> {
    res.render('services')
}) ;
app.get("/AdminThings",(req,res)=> {
    res.render('AdminThings')
}) ;

app.post("/contactInfo",(req,res)=> {
    let name = req.body.name ;
    let email = req.bodt.email ;
    let message = req.body.message ;

    alert("Hello "+name+" ,Your Query is submitted....")
    res.render('Contact')
}) ;



app.get("/UserDetails",(req,res)=> {

    const getdocument = async ()=>{
        try{
            const result = await Registerlist.find()
           
            res.render('UserDetails',{userData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();   
}) ;


app.get("/TrainInfo",(req,res)=> {

    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find()
           
            res.render('TrainInfo',{trainData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();    
}) ;


app.get("/UserTrainInfo",(req,res)=> {

    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find()
            
            res.render('UserTrainInfo',{trainData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();
}) ;


app.post('/adminValidate', function(req, res) {
    var username = req.body.adminUsername
    var password = req.body.adminPassword
    //console.log(username+" "+password);
    if (username=="irctc" && password == "2021") {
        res.render('AdminThings')
    } else { 
        
       alert("invalid Admin credentials");
       
    }
});



app.post('/DeleteInfo', function(req, res) {
    var tnum=req.body.delete;
    //console.log(tnum)
    const deldocument = async ()=>{
        try{
            
            const result=await Trainlist.deleteOne({tnum:tnum})
        }
        catch(err)
        {
            console.log(err);
        }
    }
  deldocument();

    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find()
           
            res.render('TrainInfo',{trainData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();    
})




app.post('/UpdateInfo', function(req, res) {
    var tnum=req.body.update;
    //console.log(tnum)
    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find({tnum:tnum })
            res.render("UpdateTrainInfo",
            {
                tnum:result[0].tnum,
                tname:result[0].tname,
               raddress:result[0].source,
                dest:result[0].dest,
                availSpace:result[0].availSpace,
                capacity:result[0].capacity,
                rateperkg:result[0].rateperkg,
            });
            
        }
        catch(err)
        {
            console.log(err);
           

        }
    }
    getdocument();
})













app.post('/UserLoginValidate', function(req, res) {
    var username = req.body.userUsername
    var password = req.body.userPassword
    
    const getdocument = async ()=>{
        try{
            const result = await Registerlist.find({username:username,password:password})
            
            if(result.length!=0)
            {
             //storeuname=username;
             localStorage.setItem("storeuname",username) ;
                    const docu = async ()=>{
                        try{
                            const result = await Trainlist.find()
                            
                            res.render('UserTrainInfo',{trainData:result})
                
                        }
                        catch(err)
                        {
                            console.log(err);
                        
                
                        }
                    }
                docu();
            }
            else
            res.render("UserLogin")
        }
        catch(err)
        {
            console.log(err);
            res.render("UserLogin")

        }
    }
  getdocument();
   
});







app.post('/SaveRegisterInfo', function(req, res) {
    var name = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    var date = req.body.date
    var contact = req.body.contact
    const createDocument=async ()=>{
        try{
            const rlist = new Registerlist({
                name:name,
                email:email,
                username:username,
                password:password,
                dob:date,
                contactNumber: contact,

            })
            const result = await rlist.save();
           
            res.render("login")

        }   
        catch(err){
            console.log(err);
            alert("User Name already Exists");
            res.render("UserSignUp");
        }

    }
    createDocument()
});


app.post('/UserLoginValidate', function(req, res) {
    var username = req.body.userUsername
    var password = req.body.userPassword
    
    const getdocument = async ()=>{
        try{
            const result = await Registerlist.find({username:username,password:password})
            
            if(result.length!=0)
             res.render("TrainInfo");
            else
            res.render("UserLogin")
        }
        catch(err)
        {
            console.log(err);
            res.render("UserLogin")

        }
    }
  getdocument();
   
});












app.post('/addTrains', function(req, res) {
    var tnum = req.body.Train_Number
    var tname = req.body.Train_Name
    var source = req.body.Source
    var dest = req.body.Destination
    var space = req.body.Total_Available_Space
    var capacity = req.body.Capacity
    var price = req.body.Price
    const createDocument=async ()=>{
        try{
            const tlist = new Trainlist({
                tnum:tnum,
                tname:tname,
                source:source,
                dest:dest,
                availSpace:space,
                capacity: capacity,
                rateperkg : price,

            })
            const result = await tlist.save();
           
            res.render("AdminThings")

        }   
        catch(err){
            console.log(err);
            alert("Data is not valid")
            res.render("AdminThings");
        }

    }
    createDocument()
});













app.post('/UpdateValues', function(req, res) {
    var tnum = req.body.Train_Number
    var tname = req.body.Train_Name
    var source = req.body.Source
    var dest = req.body.Destination
    var space = req.body.Total_Available_Space
    var capacity = req.body.Capacity
    var price = req.body.Price
    const updateDocument=async ()=>{
        try{
            const result=await Trainlist.updateOne({tnum:tnum},{
                $set:{
                    tnum:tnum,
                    tname:tname,
                    source:source,
                    dest:dest,
                    availSpace:space,
                    capacity: capacity,
                    rateperkg : price,
                }
            })

        }   
        catch(err){
            console.log(err);
            
        }

    }
    updateDocument()

    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find()
           
            res.render('TrainInfo',{trainData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();   
});


app.post('/BookTicket', function(req, res) {
    var tnum=req.body.cargo;
    //storetnum=tnum;
    localStorage.setItem("storetnum",tnum) ;
    
    res.render("BookTrainTicket");
    
    
})


app.get("/PaymentCargo",function(req,res) {
    res.render('PaymentCargo')
}) ;

app.post('/SaveCargoDetails', function(req, res) {
    var sendername = req.body.sendername
    var contact = req.body.contact
    var raddress = req.body.raddress
    var shippingdate = req.body.shippingdate
    var cw = req.body.cw
    var additional = req.body.additional
    //var uname = storeuname;
    var uname = localStorage.getItem("storeuname");
    var cargoid = req.body.cargoid
    var totalfare = req.body.price
    var cardnum = req.body.cardnum

    //var tnum = storetnum
    var tnum = localStorage.getItem("storetnum") ;

    const createDocument=async ()=>{
        try{
            const clist = new Cargolist({
                sendername:sendername,
                contact:contact,
                raddress:raddress,
                shippingdate:shippingdate,
                cw:cw,
                additional: additional,
                username : uname,
                cargoid : cargoid,
                totalfare : totalfare,
                cardnum : cardnum,
                tnum :tnum
            })
            const result = await clist.save();
           
        }   
        catch(err){
            console.log(err);
            
        }

    }
    createDocument()


    var x;
    //console.log(tnum);
    const getdocument = async ()=>{
        try{
            const result = await Trainlist.find({tnum:tnum})
            //console.log(result);
           x=result[0].availSpace;
           x=x-parseInt(cw);
           //   console.log(x);
               const updateDocument=async ()=>{
                   try{
                       
                       const result=await Trainlist.updateOne({tnum:tnum},{
                           $set:{
                               
                               availSpace:x,
                               
                           }
                       })
                       
                   }   
                   catch(err){
                       console.log(err);
                       
                   }
           
               }
               updateDocument()
               res.render("BookTrainTicket");
        }
        catch(err)
        {
            console.log(err);
            res.render("UserLogin")

        }
    }
  getdocument();
 
});

app.post('/AddCargo', function(req, res) {
    var sendername = req.body.sendername
    var contact = req.body.contact
    var raddress = req.body.raddress
    var shippingdate = req.body.shippingdate
    var cw = req.body.cw
    var additional = req.body.additional
    // var uname = storeuname;
    //var tnum = storetnum
    var tnum = localStorage.getItem("storetnum") ;

    cargoid = parseInt(Math.random().toString().slice(2,12));
    

    const getdocument = async ()=>{
        try{
            const result = await Trainlist.findOne({tnum:tnum})
            //console.log(tnum) ;
            //console.log(result)
            var x = parseInt(cw)

            price = x*(result.rateperkg)
           
            
           
            res.render("PaymentCargo",{
                sendername : sendername,
                contact : contact ,
                raddress : raddress,
                shippingdate : shippingdate ,
                cw : cw,
                additional : additional ,
                cargoid : cargoid,
                price : price,
                tnum:tnum 
            })

        }
        catch(err)
        {
            console.log(err);
           
        }
    }
  getdocument(); 

 
});


app.get("/HistoryDetails",function(req,res) {
    res.render('HistoryDetails')
}) ;
app.get("/BookingHistory",(req,res)=> {

    const getdocument = async ()=>{
        try{
            var storeuname = localStorage.getItem("storeuname") ;
            const result = await Cargolist.find({username: storeuname})
           
            res.render('HistoryDetails',{bookingData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument();   
}) ;

app.get("/CargoBookingDetails",function(req,res) {

    const getdocument = async ()=>{
        try{
            const result = await Cargolist.find()
           
            res.render('CargoBookingDetails',{bookingData:result})

        }
        catch(err)
        {
            console.log(err);
           

        }
    }
  getdocument(); 

}) ;

app.get("*",(req,res)=> {
    res.render('404error',{
        errorMsg:"Oops! Page Not Found"
    })
}) ;

app.listen(port,() => {
    console.log(`listening to the port at ${port} `)
})
