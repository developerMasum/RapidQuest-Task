import { Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    id: { type: String, required: true },
    customer_id: { type: String, required: true },
    first_name: String,
    last_name: String,
    company: String,
    address1: String,
    address2: String,
    city: String,
    province: String,
    country: String,
    zip: String,
    phone: String,
    name: String,
    province_code: String,
    country_code: String,
    country_name: String,
    default: { type: Boolean, default: false },
  },
  { _id: false },
);

const emailMarketingConsentSchema = new Schema(
  {
    state: String,
    opt_in_level: String,
    consent_updated_at: Date,
  },
  { _id: false },
);

const shopifyCustomerSchema = new Schema(
  {
    _id: String,
    admin_graphql_api_id: String,
    email: String,
    first_name: String,
    last_name: String,
    created_at: Date,
    updated_at: Date,
    orders_count: Number,
    state: String,
    total_spent: String,
    last_order_id: String,
    last_order_name: String,
    verified_email: { type: Boolean, default: false },
    multipass_identifier: String,
    note: String,
    tags: String,
    currency: String,
    phone: String,
    sms_marketing_consent: { type: Schema.Types.Mixed },
    email_marketing_consent: emailMarketingConsentSchema,
    tax_exempt: { type: Boolean, default: false },
    tax_exemptions: [String],
    addresses: [addressSchema],
    default_address: addressSchema,
  },
  { collection: 'shopifyCustomers' },
);

export const shopifyCustomers = model(
  'shopifyCustomers',
  shopifyCustomerSchema,
);
