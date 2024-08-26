import { shopifyOrder } from '../Orders/order.model';
import { shopifyCustomers } from './customer.model';

const getNewCustomersOverTime = async ({ interval }: { interval: string }) => {
  let groupBy;

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
      $sort: { _id: 1 },
    },
  ]);

  return result;
};

const getNumberOfRepeatCustomersOverTime = async ({
  interval,
}: {
  interval: string;
}) => {
  let groupBy;

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

  const result = await shopifyOrder.aggregate([
    {
      $group: {
        _id: {
          customerId: '$customer.id',
          interval: groupBy,
        },
        repeatedTimes: { $sum: 1 },
        firstPurchaseDate: { $min: '$created_at' },
        lastPurchaseDate: { $max: '$created_at' },
      },
    },
    {
      $match: {
        repeatedTimes: { $gt: 1 },
      },
    },
    {
      $lookup: {
        from: 'shopifyCustomers',
        localField: '_id.customerId',
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
        customerId: '$_id.customerId',
        interval: '$_id.interval',
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
      $group: {
        _id: '$interval',
        repeatCustomersCount: { $sum: 1 },
        customerNames: { $push: '$name' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result;
};

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

const getCustomerLifetimeValueByCohorts = async () => {
  const customerFirstPurchase = await shopifyOrder.aggregate([
    {
      $match: {
        created_at: { $exists: true, $ne: null },
      },
    },
    {
      $addFields: {
        created_at: { $toDate: '$created_at' },
      },
    },
    {
      $group: {
        _id: '$customer.id',
        firstPurchaseMonth: {
          $min: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
        },
      },
    },
  ]);

  const customerFirstPurchaseMap: Record<string, string> = {};
  customerFirstPurchase.forEach((record) => {
    customerFirstPurchaseMap[record._id] = record.firstPurchaseMonth;
  });

  const result = await shopifyOrder.aggregate([
    {
      $match: {
        created_at: { $exists: true, $ne: null },
      },
    },
    {
      $addFields: {
        created_at: { $toDate: '$created_at' },
        firstPurchaseMonth: {
          $let: {
            vars: {
              firstPurchase: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: customerFirstPurchase,
                      as: 'c',
                      cond: { $eq: ['$$c._id', '$customer.id'] },
                    },
                  },
                  0,
                ],
              },
            },
            in: '$$firstPurchase.firstPurchaseMonth',
          },
        },
      },
    },
    {
      $group: {
        _id: '$firstPurchaseMonth',
        totalCLV: { $sum: { $toDouble: '$total_price_set.shop_money.amount' } },
        customerCount: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result;
};

export const CustomerService = {
  getNewCustomersOverTime,
  getNumberOfRepeatCustomers: getNumberOfRepeatCustomersOverTime,
  getGeographicalDistribution,
  getCustomerLifetimeValueByCohorts,
};
