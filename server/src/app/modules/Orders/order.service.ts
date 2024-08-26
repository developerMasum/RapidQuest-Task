import { shopifyOrder } from './order.model';

const getTotalSalesOverTime = async ({ interval }: { interval: string }) => {
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
        _id: groupBy,
        totalSales: {
          $sum: { $toDouble: '$total_price_set.shop_money.amount' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result;
};

const getSalesGrowthRateOverTime = async () => {
  const result = await shopifyOrder.aggregate([
    {
      $addFields: {
        purchaseMonth: {
          $dateToString: { format: '%Y-%m', date: { $toDate: '$created_at' } },
        },
      },
    },
    {
      $group: {
        _id: '$purchaseMonth',
        totalSales: {
          $sum: { $toDouble: '$total_price_set.shop_money.amount' },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $setWindowFields: {
        sortBy: { _id: 1 },
        output: {
          previousSales: {
            $shift: { output: '$totalSales', by: -1 },
          },
        },
      },
    },
    {
      $addFields: {
        growthRate: {
          $cond: {
            if: { $eq: ['$previousSales', null] },
            then: null,
            else: {
              $multiply: [
                {
                  $divide: [
                    { $subtract: ['$totalSales', '$previousSales'] },
                    '$previousSales',
                  ],
                },
                100,
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalSales: 1,
        growthRate: 1,
      },
    },
  ]);

  return result;
};

export const OrderService = {
  getOrders: getTotalSalesOverTime,
  getSalesGrowthRateOverTime,
};
