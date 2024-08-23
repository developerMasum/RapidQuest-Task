import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CustomerService } from './customer.service';

const getCustomerAddedOverTime = catchAsync(async (req, res) => {
  const result = await CustomerService.getNewCustomersOverTime();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Customer added over time are retrieved successfully',
    data: result,
  });
});
const getNumberOfRepeatCustomers = catchAsync(async (req, res) => {
  const result = await CustomerService.getNumberOfRepeatCustomers();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' NumberOfRepeatCustomers  retrieved successfully',
    data: result,
  });
});

export const CustomerController = {
  getCustomerAddedOverTime,
  getNumberOfRepeatCustomers,
};
