const mongoose= require('mongoose');


const userSchema = mongoose.Schema({
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        toggle:{
            type:Boolean,
            default:false
        },
        reminder:{
            type:String,
            default:"8:00"
        }
        ,
        tasks:{
            type:Array,
            default:[ {
                "time": "03:11",
                "status": "UPCOMING"
              },
               {
                "time": "15:05",
                "status": "MONTHLY"
              },
              {
                "time": "23:05",
                "status": "COLD"
              }]
        }
})

const userModel= mongoose.model('users',userSchema);

module.exports=userModel;