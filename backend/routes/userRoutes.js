import express from 'express';
import { getAllSweets, getSweetById, placeOrder } from '../controllers/userController.js';

const router = express.Router();

router.get('/sweets', getAllSweets);
router.get('/sweet/:id', getSweetById);
router.post('/order', placeOrder);

export default router;
