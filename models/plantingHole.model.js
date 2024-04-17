const mongoose = require('mongoose');
const { Schema } = mongoose; 

const plantingHolesSchema = new Schema({
  planting_site_id: {
    type: Schema.Types.ObjectId,
    ref: 'PlantingSite',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'planted', 'damaged'],
    required: true,
  },
  species_type: String,
  additional_info: Schema.Types.Mixed, 
});

const PlantingHole = mongoose.model('PlantingHole', plantingHolesSchema);

module.exports = PlantingHole;

