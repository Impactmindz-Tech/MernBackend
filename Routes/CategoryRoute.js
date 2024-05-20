import express from 'express';

import {AddCategory ,getCategory,getCategoryId,updateCategory ,softdelete } from '../Controllers/CategoryController.js';
import { auth } from '../Middleware/Authmiddleware.js';
export const CategoryRouter = express.Router();

CategoryRouter.post('/AddCategory',AddCategory)
.get('/',getCategory)
.get('/:id',getCategoryId)

.patch('/update/:id',updateCategory)
.put('/delete/:id/status/:status',softdelete);

;
