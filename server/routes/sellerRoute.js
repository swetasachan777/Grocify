
import express from 'express';  // Fix: add quotes around 'express'
import authUser from "../middlewares/authUser.js";
import { isSellerAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.js";
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth',authSeller, isSellerAuth);
sellerRouter.get('/logout', authSeller,sellerLogout);


export default sellerRouter;
