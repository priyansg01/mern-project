import express from 'express';
import { createListing, deleteListing} from '../controllers/listing.controller.js';
import { verifytoken } from '../utils/verifyuser.js';


const router = express.Router();

router.post('/create', verifytoken , createListing);
router.delete('/delete/:id',verifytoken,deleteListing);


export default router;