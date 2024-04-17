const mongoose = require('mongoose');

const eventsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  place: String,
  date: {
    type: Date,
    required: true,
  },
  startTime: Date,
  endTime: Date,
});

Event = mongoose.model('Event', eventsSchema);

module.exports = Event;