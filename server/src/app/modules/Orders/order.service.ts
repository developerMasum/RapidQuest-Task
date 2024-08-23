import { shopifyOrder } from './order.model';

const getTotalSalesOverTime = async (interval = 'daily') => {
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

  const result = await shopifyOrder.aggregate([
    {
      $group: {
        _id: groupBy,
        totalSales: {
          $sum: { $toDouble: '$total_price_set.shop_money.amount' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by the grouping field (e.g., date)
    },
  ]);

  return result;
};

const getSalesGrowthRateOverTime = async (interval = 'monthly') => {
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

  const result = await shopifyOrder.aggregate([
    {
      $group: {
        _id: groupBy,
        totalSales: {
          $sum: { $toDouble: '$total_price_set.shop_money.amount' },
        },
      },
    },
    {
      $sort: { _id: 1 }, // Sort by the grouping field (e.g., date)
    },
    {
      $setWindowFields: {
        sortBy: { _id: 1 },
        output: {
          previousTotalSales: {
            $shift: {
              output: '$totalSales',
              by: -1,
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalSales: 1,
        growthRate: {
          $cond: {
            if: { $eq: ['$previousTotalSales', null] },
            then: null,
            else: {
              $multiply: [
                {
                  $divide: [
                    { $subtract: ['$totalSales', '$previousTotalSales'] },
                    '$previousTotalSales',
                  ],
                },
                100,
              ],
            },
          },
        },
      },
    },
  ]);

  return result;
};

export const OrderService = {
  getOrders: getTotalSalesOverTime,
  getSalesGrowthRateOverTime,
};
