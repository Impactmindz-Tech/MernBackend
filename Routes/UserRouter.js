import {UserRegistration ,Userlogin ,changePassword } from '../Controllers/UserController.js';
import { auth }  from '../Middleware/Authmiddleware.js';
import jwt from 'jsonwebtoken'
import express from 'express';

export const userRouter = express.Router();
userRouter.post('/AddUser',UserRegistration)
.post('/login',Userlogin)
.post('/update/:id',changePassword );