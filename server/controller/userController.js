
const userModel= require('../Models/userModel');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');

const userRegister = async (data)=>{
    //   return data
    const user =await userModel.findOne({email:data.email});
    console.log(data.email);
    if(user){
        return {
            "status": "failed",
            "message": 'Email already exists'
        }
    }
    else{
        if(data.name && data.email && data.password ){
            try{
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(data.password, salt);
                const newUser= new userModel({
                    name: data.name,
                    email: data.email,
                    password:hashPassword,
                    
                   })
                 const temp=  await userModel.create(newUser);
                 console.log(temp);
                 const registeredUser= userModel.findOne({email:data.email})
                 
                //  Generate JWT token

                const token  = jwt.sign({userId:registeredUser._id},"secret")
                 
                 return {
                    "status": "success",
                    "message": 'User Registered Successfully',
                    "token": token
                }
            }catch(e){
                return {
                    "status": "failed",
                    "message": e.message
                }
            }
          
        }else{
            return {
                "status": "failed",
                "message": 'All fields are required'
            }
        }
    
}
}

const userLogin =async(data)=>{
    try{
 const {email,password}=data;
 if(email && password){
    const user = await userModel.findOne({ email: email});
    const token  = jwt.sign({userId:user._id},"secret")
    if(user !=null){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch && (user.email === email)){
            return {
                "status": "success",
                "message": 'Login Successfull',
                "token": token
            }
        }else{
            return {
                "status": "failed",
                "message": 'Email or password is incorrect',
            }
        }
    }else{
        return {
            "status": "failed",
            "message": 'User is not Registered',
        }

    }
 }else{
    return {
        "status": "failed",
        "message": 'All fields are required'
    }
 }
    }catch(e){
        return {
            "status": "failed",
            "message": 'User is not Registered',

        }
    }
}


const loggedInUser = async (data)=>{
 return {
    "user":data
 }
}

const handleToggle=async(data,id)=>{
    console.log(data,"data");
        try {
            const user = await userModel.findByIdAndUpdate(
              id,
              { toggle:data },
          
            );
   return({"message":"toggle updated successfully","data":user})
    }catch(e){
        return({"message":e.message})
    }

}

const updateTime=async(req,res)=>{
    
}
module.exports={
    userLogin,
    userRegister,
    loggedInUser,
    handleToggle,
    updateTime
}

 