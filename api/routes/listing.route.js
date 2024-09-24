import express from 'express'
import { createlisting } from '../controllers/listing.controller.js';
import { verifytoken } from '../utils/verifyuser.js';

const router= express.Router();
 
router.post('/create',verifytoken, createlisting);

export default router;