const mongoose=require("mongoose");

//  connection creation and create a new db

mongoose.connect("mongodb://localhost:27017/railway",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("connecction successful"))
    .catch((err)=>console.log(err))




// schema for registration

const registrationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
         type:String,
         required:true,
         unique:true,       
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    dob:{
        type:String,
        required:true,
        
    },
    contactNumber:{
        type:String,
        required:true,
        
    },

})

//define model  collection craetion for registration

const Registerlist=new mongoose.model("Registerlist",registrationSchema)












//-----------------------------train schema-------------------------------------
// schema for train

const trainSchema=new mongoose.Schema({
    tnum:{
        type:String,
        required:true,
        unique:true,
    },
    tname:{
         type:String,
         required:true,
         unique:true,       
    },
    source:{
        type:String,
        required:true,
        
    },
    dest:{
        type:String,
        required:true,
        
    },
    availSpace:{
        type:Number,
        required:true,
        
    },
    capacity:{
        type:Number,
        required:true,
        
    },
    rateperkg:{
        type:Number,
        required:true,
        
    },    

})

//define model  collection craetion for registration

const Trainlist=new mongoose.model("Trainlist",trainSchema)


//---------------------------Cargo schema-----------------------------------------------


const cargoSchema=new mongoose.Schema({
    sendername:{
        type:String,
        required:true,
        
    },
    contact:{
         type:String,
         required:true,
               
    },
    raddress:{
        type:String,
        required:true,
        
    },
    cw:{
        type:Number,
        required:true,
        
    },
    
    shippingdate:{
        type:String,
        required:true,
        
    },
    additional:{
        type:String,
        required:true,
        
    },   
    username:{
        type:String,
        required:true,
    } ,
    cargoid:{
        type:Number,
        required:true,
    } ,
    totalfare:{
        type:Number,
        required:true,
    } ,
    cardnum:{
        type:String,
        required:true,
    } ,
    tnum:{
        type:String,
        required:true,
    }

})

//define model  collection craetion for registration

const Cargolist=new mongoose.model("Cargolist",cargoSchema)





module.exports = {Registerlist,Trainlist , Cargolist }