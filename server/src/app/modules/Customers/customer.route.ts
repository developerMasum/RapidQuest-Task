import express from 'express';
import { CustomerController } from './customer.controller';

const router = express.Router();

router.get('/', CustomerController.getCustomerAddedOverTime);
router.get('/repeat', CustomerController.getNumberOfRepeatCustomers);
router.get('/location', CustomerController.getGeographicalDistribution);
router.get('/cohort', CustomerController.getCustomerLifetimeValueByCohorts);

export const customerRoute = router;
