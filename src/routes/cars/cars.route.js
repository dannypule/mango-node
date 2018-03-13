import express from 'express';
import { addCar, getCars, deleteCar, updateCar } from '../../controllers/cars/cars.controller';
const router = express.Router();

// ===================================================
// ROUTE '/api/cars'
// =========================
router.get('/', getCars);
router.post('/', addCar);
router.put('/', updateCar);
router.delete('/', deleteCar);

export default router;
