const jwt =require('jsonwebtoken');
const userauthenticate=async(req,res,next)=>{

    const {authorization}= req.headers;

    if(authorization&& authorization.startsWith('Bearer')){
        try{
            let token = authorization.split(" ")[1];
            let {id}=jwt.verify(token,'secret');

            req.user=await userModel.findById(id).select('-password')
            next();
        }catch(e){
                      
        res.status(401).send({
            "status":"failed",
            "message":"unauthorized User"
        })
        }
    }if(!token){
        res.status(401).send({
            "status":"failed",
            "message":"unauthorized User , No Token"
        })
    }

}

module.exports=userauthenticate