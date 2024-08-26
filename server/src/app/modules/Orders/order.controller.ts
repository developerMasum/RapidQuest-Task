import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { OrderService } from './order.service';

const getOrderData = catchAsync(async (req, res) => {
  const { interval } = req.query as { interval: string };
  const result = await OrderService.getOrders({ interval });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieved successfully',
    data: result,
  });
});

const getSalesGrowthRateOverTime = catchAsync(async (req, res) => {
  const result = await OrderService.getSalesGrowthRateOverTime();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieved successfully',
    data: result,
  });
});

export const OrderController = { getOrderData, getSalesGrowthRateOverTime };
