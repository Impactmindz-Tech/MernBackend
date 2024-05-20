import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import 'dotenv/config';
import ejs from 'ejs';
import {userRouter} from './Routes/UserRouter.js';
import {CategoryRouter} from './Routes/CategoryRoute.js';
import {productRouter} from './Routes/ProductRoute.js'
import {Category} from './Models/CategoryModels.js';
import { Product } from './Models/ProductModel.js';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//declare constraints value

const app  = express();
const port = process.env.PORT || 4000;
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({

  credentials:true,
}));

//connect to mongodb

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge:1000 * 60 * 60 * 24
  }
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

async function main() {
  try {
      await mongoose.connect('mongodb+srv://admin:admin123@cluster0.r3gxklu.mongodb.net/Merndashboard?retryWrites=true&w=majority&appName=Cluster0');
      console.log("Connected successfully to MongoDB");
  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
  }
}


main().catch((err)=>{
    if(err)
        {
            console.log(err);
        
        }
})

app.set('view engine', 'ejs');


app.use('/user',userRouter);
app.use('/category',CategoryRouter);
app.use('/product',productRouter);




app.listen(port,(err)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log(`listening the port ${port}`);
  }
})




