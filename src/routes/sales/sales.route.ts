import * as express from 'express';
import { getAllSales, getSalesByCompanyName } from '../../controllers/sales/sales.controller';
const router = express.Router();

// ===================================================
// ROUTE '/api/sales'
// =========================
router.get('/', getAllSales);

router.post('/', getSalesByCompanyName);

export default router;
