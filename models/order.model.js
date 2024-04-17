const mongoose = require('mongoose');
const { Schema } = mongoose; 

const itemSchema = new Schema({
  seedling_id: {
    type: Schema.Types.ObjectId,
    ref: 'Seedling',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [itemSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'completed', 'cancelled'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  payment_details: Schema.Types.Mixed,
});

Order = mongoose.model('Order', orderSchema);

module.exports = Order;