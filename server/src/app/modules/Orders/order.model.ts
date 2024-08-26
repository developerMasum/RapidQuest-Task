import { Schema, model } from 'mongoose';

const shopifyOrderSchema = new Schema(
  {
    order_number: Number,
    email: String,
    total_price: String,
    created_at: Date,
    updated_at: Date,
  },
  { collection: 'shopifyOrders' },
);

export const shopifyOrder = model('shopifyOrders', shopifyOrderSchema);
