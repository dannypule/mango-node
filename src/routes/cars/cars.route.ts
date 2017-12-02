import * as express from 'express';
import { addCar, getCars } from '../../controllers/cars/cars.controller';
const router = express.Router();

// ===================================================
// ROUTE '/api/cars'
// =========================
router.get('/', getCars);

router.post('/', addCar);

export default router;
