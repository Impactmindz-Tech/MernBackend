import {User} from '../Models/UserModels.js'

export const checkrole = async(req,res,next)=>{
let id = req.body.id;
    try{
        let checkuser = await User.findById({_id:id});
        if(checkuser.Role==='admin'){
            next();
        }
        else{
        
            console.log("user are not allowed");
            res.json({message:"users are not allowed to add new product"})
        }

    }catch(error){
        console.log(error);
        res.json({message:"Something went wrong"});
    }
}