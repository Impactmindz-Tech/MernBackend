import {Category} from '../Models/CategoryModels.js';

// add category

export const AddCategory = async(req,res)=>{
    const{cat_name,cat_desc} = req.body;
    try{
        let checkCategory = await Category.findOne({cat_name});
        if(checkCategory){
            console.log("category name is already exists");
      
        }
        else{
            let newCatg = new Category({
                cat_name,
                cat_desc
            })
            let doc = await newCatg.save();
            res.status(200).json(doc);

        
        }
    }catch(error){
        console.log(error);
        res.json({message:error.message,success:false});
    }
}


//get all the category

export const getCategory = async(req,res)=>{
    try{
        let DroneVideos = await Category.find({status:1},{_id:0});
      
       if(DroneVideos.length>0){
        res.status(200).json({status:1,message:'Allcategories',categoryname:{DroneVideos}});
       }
       else{
        res.status(404).json({ message: 'Data not found' });
       }

    }catch(error){
        res.json({message:"Something went wrong"});
    }
}


//get category  by  the cat_id

export const getCategoryId = async(req,res)=>{
    const id = req.params.id;;
    try {
        const data = await Category.find({ cat_id: id, status: 1 });
        if (data.length > 0) {
            res.status(200).json({ message: 'Category fetched by Id', data });
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}


//update the category list

export const updateCategory = async (req, res) => {
    const id = req.params.id;
    
    try {
        // Check if the request body is empty
        if (Object.keys(req.body).length === 0) {
            console.log("Request body is empty");
            return res.status(400).json({ message: "Request body is empty" });
        }

        // Find the category by ID and update it
        let updatedData = await Category.findOneAndUpdate({ cat_id: id }, req.body, { new: true });

        // Check if the category is not found
        if (!updatedData) {
            console.log("Category not found");
            return res.status(404).json({ message: "Category not found" });
        }

        // Category updated successfully
        console.log("Category updated successfully");
        res.status(200).json(updatedData);
    } catch (error) {
        console.log("Something went wrong during updation:", error);
        res.status(500).json({ message: "Something went wrong during updation" });
    }
}


//only hide not delete from the database 😊

export const softdelete = async(req,res)=>{
    const{id,status} = req.params;
    
    
        try{
            let findProduct = await Category.findOneAndUpdate({cat_id:id},{status:status},{new:true});
            console.log(findProduct);
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
    


