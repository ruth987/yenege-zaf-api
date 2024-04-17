const mongoose = require('mongoose');
const { Schema } = mongoose;

const lastSeedlingsReportSchema = new Schema({
  reported_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
    unique: true, 
  },
  reported_date: {
    type: Date,
    required: true,
  },
  number_lost: {
    type: Number,
    required: true,
  },
  reason: String,
  pictures: [String], 
  admin_verified: Boolean,
  replacement_approved: Boolean,
  replacement_details: {
    date_shipped: Date,
    tracking_number: String,
  },
});

LastSeedlingsReport = mongoose.model('LastSeedlingsReport', lastSeedlingsReportSchema);

 module.exports = LastSeedlingsReport;