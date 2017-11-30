import * as express from 'express';
import { login } from '../../controllers/auth/auth.controller';
const router = express.Router();

// ===================================================
// ROUTE '/auth'
// =========================
router.post('/login', login);

// router.post('/', getSalesByCompanyName);

export default router;
