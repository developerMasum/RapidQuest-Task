import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getCustomerAddedOverTime = catchAsync(async (req, res) => {
  const result = await OrderService.getOrders();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Customer added over time are retrieved successfully',
    data: result,
  });
});

export const OrderController = { getCustomerAddedOverTime };
