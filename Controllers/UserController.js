import { User } from "../Models/UserModels.js";
import { Product } from "../Models/ProductModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import session from 'express-session'
const saltRounds = 10;
export const UserRegistration = async (req, res) => {
  const { Name, Password, Email, Phone, Role } = req.body;

  try {
    let emailcheck = await User.findOne({Email});
    if(emailcheck){
        console.log("the given email is already registered");
        res.json({message:"email is already registered"});
    }

  else{
    const hash = bcrypt.hashSync(req.body.Password, saltRounds);
    const Newuser = new User({
      Name,
      Password:hash,
      Email,
      Phone,
      Role,
    });

    let token  = jwt.sign({id:Newuser._id},process.env.secretkey);

   Newuser.token = token;

    let data = await Newuser.save();
    console.log(data);
    console.log(token);
  res.json(data);

  }

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};




export const Userlogin = async(req,res)=>{

    const{Email,Password} = req.body;
    
    try{
           
           let check  = await User.findOne({Email});
           let checkPass = bcrypt.compareSync(Password, check.Password);
           if(!check){
               console.log("Enter a valid Email");
               res.json({success:false});
           } 
       else if(!checkPass){
            console.log("please enter the valid password");
            res.json({success:false});
           }
   
         
          
           else{
            let token  = jwt.sign({id:check._id},process.env.secretkey);
            console.log("succesfully login");
           check.Password=undefined;
           req.session.Name = check.Name;
           req.session.token = token;
           console.log(req.session.Name);
        
            res.json({success:true,token,check,username:req.session.Name,id:check.user_id});
           }

    }catch(error){
        res.json({message:error})
    }
}

//api to change the password
export const changePassword = async (req, res) => {
  const id = req.params.id;
  const { old_password, new_password } = req.body;

  try {
      let user = await User.findOne({ _id: id });
      if(!user){
         res.json("user id not found // user not found");
      }
      else{
        //compare the old password 
        let checkPass = bcrypt.compareSync(old_password, user.Password);
        if(checkPass){
          // if correct then hash the new password and save it into the database
          const hash = bcrypt.hashSync(new_password, saltRounds);
          user.Password = hash;
          await user.save();
          res.json("password is correct and password is updated succesfully");
        }
        else{
          res.json("password is not correct");
        }
      }
      
    
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}