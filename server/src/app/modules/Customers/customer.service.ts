import { shopifyOrder } from '../Orders/order.model';
import { shopifyCustomers } from './customer.model';

const getNewCustomersOverTime = async (interval = 'daily') => {
  let groupBy;

  // Determine the grouping interval
  switch (interval) {
    case 'daily':
      groupBy = {
        $dateToString: {
          format: '%Y-%m-%d',
          date: { $dateFromString: { dateString: '$created_at' } },
        },
      };
      break;
    case 'monthly':
      groupBy = {
        $dateToString: {
          format: '%Y-%m',
          date: { $dateFromString: { dateString: '$created_at' } },
        },
      };
      break;
    case 'quarterly':
      groupBy = {
        $concat: [
          {
            $substr: [
              { $year: { $dateFromString: { dateString: '$created_at' } } },
              0,
              4,
            ],
          },
          '-Q',
          {
            $toString: {
              $ceil: {
                $divide: [
                  {
                    $month: { $dateFromString: { dateString: '$created_at' } },
                  },
                  3,
                ],
              },
            },
          },
        ],
      };
      break;
    case 'yearly':
      groupBy = {
        $dateToString: {
          format: '%Y',
          date: { $dateFromString: { dateString: '$created_at' } },
        },
      };
      break;
    default:
      throw new Error('Invalid interval specified');
  }

  const result = await shopifyCustomers.aggregate([
    {
      $project: {
        created_at: 1,
        intervalGroup: groupBy,
      },
    },
    {
      $group: {
        _id: '$intervalGroup',
        totalNewCustomers: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by the grouping field (e.g., date)
    },
  ]);

  return result;
};
//   ----------------------------------------------------------------------------------------{TODO}
const getCustomerPurchaseDetails = async () => {
  const result = await shopifyOrder.aggregate([
    {
      $group: {
        _id: '$customer.id',
        repeatedTimes: { $sum: 1 },
        firstPurchaseDate: { $min: '$created_at' },
        lastPurchaseDate: { $max: '$created_at' },
      },
    },
    {
      $lookup: {
        from: 'shopifyCustomers',
        localField: '_id',
        foreignField: 'id',
        as: 'customerDetails',
      },
    },
    {
      $unwind: '$customerDetails',
    },
    {
      $project: {
        _id: 0,
        customerId: '$_id',
        repeatedTimes: 1,
        name: {
          $concat: [
            '$customerDetails.first_name',
            ' ',
            '$customerDetails.last_name',
          ],
        },
        firstPurchaseDate: 1,
        lastPurchaseDate: 1,
      },
    },
    {
      $sort: { repeatedTimes: -1 }, // Sort by number of purchases in descending order
    },
  ]);

  return result;
};

// ------------------------------------------------------------------------------------------
const getGeographicalDistribution = async () => {
  const result = await shopifyCustomers.aggregate([
    {
      $group: {
        _id: '$default_address.city',
        totalCustomers: { $sum: 1 },
      },
    },
    {
      $sort: { totalCustomers: -1 },
    },
  ]);

  return result;
};

export const CustomerService = {
  getNewCustomersOverTime,
  getNumberOfRepeatCustomers: getCustomerPurchaseDetails,
  getGeographicalDistribution,
};
