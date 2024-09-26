import express from 'express'
import { deleteuser, test, updateuser, getUsetListings } from '../controllers/user.controller.js';
import { verifytoken } from '../utils/verifyuser.js';


const router=express.Router();
router.get('/test',test)
router.post('/update/:id',verifytoken,updateuser)
router.delete('/delete/:id',verifytoken, deleteuser)
router.get('/listings/:id',verifytoken, getUsetListings)

export default router;