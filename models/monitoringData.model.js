const mongoose = require('mongoose');
const { Schema } = mongoose;

const monitoringDataSchema = new Schema({
  tree_tag_id: {
    type: Schema.Types.ObjectId,
    ref: 'TreeTag',
  },
  date: {
    type: Date,
    required: true,
  },
  height: Number,
  diameter: Number,
  other_metrics: Schema.Types.Mixed, 
  recorded_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

MonitoringData = mongoose.model('MonitoringData', monitoringDataSchema);

module.exports = MonitoringData