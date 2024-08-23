import { Schema, model } from 'mongoose';

const shopifyCustomerSchema = new Schema(
  {
    order_number: Number,
    email: String,
    total_price: String,
    created_at: Date,
    updated_at: Date,
    // Add other fields as necessary
  },
  { collection: 'shopifyCustomers' },
);

export const shopifyCustomers = model('shopifyCustomers', shopifyOrderSchema);
