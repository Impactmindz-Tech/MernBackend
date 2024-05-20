import session from "express-session";

export const auth = (req,res,next)=>{
    console.log(req.session.userid);
    try{
        if (!req.session.userid ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        else{
            next();
        }
    
    }catch(error){
        res.json({message:error.message})
    }
}