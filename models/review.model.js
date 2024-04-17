const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
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
  seedling_id: {
    type: Schema.Types.ObjectId,
    ref: 'Seedling',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);