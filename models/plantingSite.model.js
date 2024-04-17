const mongoose = require('mongoose');
const { Schema } = mongoose;

const geoJSONSchema = new Schema({
  type: {
    type: String,
    enum: ['Point', 'Polygon', 'MultiPolygon'],
  },
  coordinates: [], 
});

const environmentalConditionsSchema = new Schema({
  soil_type: String,
  sun_exposure: String,
});

const plantingSiteSchema = new Schema({
  name: String,
  description: String,
  location: geoJSONSchema,
  area: Number,
  environmental_conditions: environmentalConditionsSchema,
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

PlantingSite = mongoose.model('PlantingSite', plantingSiteSchema);

module.exports = PlantingSite;