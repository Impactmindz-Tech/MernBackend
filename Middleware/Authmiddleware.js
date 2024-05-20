import jwt from 'jsonwebtoken';

export const auth = ((req,res,next)=>{
    const token = req.get('Authorization').split('Bearer ')[1];

    
    let decoded = jwt.verify(token,process.env.secretkey);
    console.log(decoded);
    if(decoded.id){
        next() 

     }
     else{
         res.sendStatus(401)
     }
})