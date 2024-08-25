import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CustomerService } from './customer.service';

const getCustomerAddedOverTime = catchAsync(async (req, res) => {
  const { interval } = req.query as { interval: string };
  const result = await CustomerService.getNewCustomersOverTime({ interval });
  // console.log(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Customer added over time are retrieved successfully',
    data: result,
  });
});
const getNumberOfRepeatCustomers = catchAsync(async (req, res) => {
  const { interval } = req.query as { interval: string };
  const result = await CustomerService.getNumberOfRepeatCustomers({ interval });
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' NumberOfRepeatCustomers  retrieved successfully',
    data: result,
  });
});
const getGeographicalDistribution = catchAsync(async (req, res) => {
  const result = await CustomerService.getGeographicalDistribution();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GEO LOCATION  retrieved successfully',
    data: result,
  });
});
const getCustomerLifetimeValueByCohorts = catchAsync(async (req, res) => {
  const result = await CustomerService.getCustomerLifetimeValueByCohorts();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'GEO LOCATION  retrieved successfully',
    data: result,
  });
});

export const CustomerController = {
  getCustomerAddedOverTime,
  getNumberOfRepeatCustomers,
  getGeographicalDistribution,
  getCustomerLifetimeValueByCohorts,
};
