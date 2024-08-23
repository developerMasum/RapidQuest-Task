import express from 'express';
import { CustomerController } from './customer.controller';

const router = express.Router();

router.get('/', CustomerController.getCustomerAddedOverTime);
router.get('/repeat', CustomerController.getNumberOfRepeatCustomers);
router.get('/location', CustomerController.getGeographicalDistribution);

export const customerRoute = router;
