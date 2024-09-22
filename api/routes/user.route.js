import express from 'express'
import { test, updateuser } from '../controllers/user.controller.js';
import { verifytoken } from '../utils/verifyuser.js';


const router=express.Router();
router.get('/test',test)
router.post('/update/:id',verifytoken,updateuser)
export default router;