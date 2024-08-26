import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getOrderData);
router.get('/growth', OrderController.getSalesGrowthRateOverTime);
export const orderRoute = router;
