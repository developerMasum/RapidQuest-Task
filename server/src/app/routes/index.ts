import { orderRoute } from './../modules/Orders/order.route';
import { Router } from 'express';

// import { ProductsRoutes } from '../modules/products/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/orders',
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
