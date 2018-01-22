import * as express from 'express';
import { login } from '../../controllers/auth/auth.controller';
const router = express.Router();

// ===================================================
// ROUTE '/auth'
// =========================
router.post('/login', login); // POST '/auth/login'

export default router;
