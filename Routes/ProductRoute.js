import express from 'express';

import {AddNewProduct,getAllPro,Update,softdelete,getPro ,getProduct,sorting} from '../Controllers/ProductController.js'
export const productRouter = express.Router();
import {checkrole} from '../Middleware/Rolemiddleware.js'
import { auth } from '../Middleware/SesMiddleware.js';
productRouter.post('/AddNewProduct/:id',AddNewProduct)
.get('/',getAllPro)
.get('/search/:key',getPro)
.patch('/Update/:id',Update)

.put('/softdelete/:id/status/:status',softdelete)

.get('/:id',getProduct)
.get('/sorting',sorting);
;



