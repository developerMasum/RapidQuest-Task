import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();
// problem-1
router.get('/', OrderController.getOrderData);
// problem-2
router.get('/growth', OrderController.getSalesGrowthRateOverTime);

export const orderRoute = router;
