import {Product} from '../Models/ProductModel.js';
import {User} from '../Models/UserModels.js';
import { Category } from '../Models/CategoryModels.js';


//add product to the database

export const AddNewProduct = async (req, res) => {
    const { p_name, url, p_desc, cat_name, type, p_image } = req.body;
    let id = req.params.id;
    console.log(id);

    try {
        // Check if all required fields are provided
        if (!p_name || !url || !p_desc || !cat_name || !type || !p_image) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find category ID based on category name
        let cate_id = await Category.findOne({ cat_name: cat_name });
        if (!cate_id) {
            console.log("Category not found");
            return res.status(404).json({ error: "Category not found" });
        }
        let categoryid = cate_id.cat_id;

        // Create a new product instance and save it
        let newPro = new Product({
            p_name: p_name,
            url: url,
            p_desc: p_desc,
            cat_name: cat_name,
            type: type,
            p_image: p_image,
            user_id:id,
         
            CategoryId: categoryid
        });
    
        let doc = await newPro.save();
        console.log("Product created successfully");

        res.status(200).json(doc);
    } catch (error) {
        console.log("Something went wrong");
        res.status(500).json({ error: error.message });
    }
}




//get the all product by group wise

export const getAllPro = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: { status: 1 } // Filter documents with status: 1
            },
            {
                $group: {
                    _id: "$cat_name", // Field to group by
                    data: { $push: "$$ROOT" } // Store the documents in an array
                }
            }
        ]).exec();

        if (result.length === 0) {
            console.log("No products found");
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(result);

    } catch (error) {
        console.log("Something went wrong");
        res.status(500).json({ message: error.message });
    }
}


//get product by  specific id


export const getProduct = async (req, res) => {
    let id = req.params.id;
    try {
        // Find the product by ID
        let data = await Product.findOne({ p_id: id, status: 1 }, { _id: 0 });

        if (!data) {
            console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.log("Something went wrong");
        res.status(500).json({ message: error.message });
    }
}




//get product by category name

export const getPro = async(req,res)=>{
   let key = req.params.key;

  
    try{
    let data = await Product.find({
        "$or":[
            {"cat_name":{$regex:key}}
        ]
    })
   if(!data){
    res.status(404).json({message:"Product not found"});
   }
   else{
    res.status(200).json({message:"Product found",data})
   }
      

       
         
    }
    catch(error){
        console.log("error",error);
        res.json({message:error.message});
    }
}


// for updation the product in database

export const Update = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the request body is empty
        if (Object.keys(req.body).length === 0) {
            console.log("Request body is empty");
            return res.status(400).json({ message: "Request body is empty" });
        }

        // Find the product by ID and update it
        let updatedDoc = await Product.findOneAndUpdate({ p_id: id }, req.body, { new: true });

        // Check if the product is not found
        if (!updatedDoc) {
            console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        // Product updated successfully
        console.log("Product updated successfully");
        res.status(200).json(updatedDoc);
    } catch (error) {
        console.log("Something went wrong");
        res.status(500).json({ message: error.message });
    }
}


//delete the data  but not from the database only hide from user's eye


export const softdelete = async(req,res)=>{
const{id,status} = req.params;

    try{
        let findProduct = await Product.findOneAndUpdate({p_id:id},{status:status},{new:true});
        if(!findProduct){
            console.log("product is not found");
            res.json({message:"product not found"});
        }
        else{
            res.json({message:"status Successfully updated"});
        }
        
    }catch(error){
        res.json({message:"something went wrong"})
    }
}

//sorting

export const sorting = async(req,res)=>{
    
    try{
       if(req.query.sort){
        let sortdata = await Product.find({Status:1}).sort(req.query.sort);
        res.json(sortdata);
       }
       else{
        let sortdata = await Product.find({Status:1});
        res.json(sortdata);
       }
    }catch(error){
        res.json({message:"something error"})
    }
}