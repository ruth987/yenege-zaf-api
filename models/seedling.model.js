const mongoose = require('mongoose');

const seedlingsSchema = new Schema({
  species: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: String,
  image: String, 
  price: Number,
  stock: Number,
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

Seedling = mongoose.model('Seedling', seedlingsSchema);

module.exports = Seedling;
