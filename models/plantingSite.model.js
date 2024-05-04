const mongoose = require('mongoose')
const { Schema } = mongoose

const geoJSONSchema = new Schema({
    type: {
        type: String,
        enum: ['Point', 'Polygon', 'MultiPolygon'],
        required: true
    },
    coordinates: { 
        type: [Number], 
        required: true
    }
})

const environmentalConditionsSchema = new Schema({
    soil_type: String,
    sun_exposure: String,
})

const plantingSiteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: geoJSONSchema,
    area: {
      type: Number,
      required: true,
    },
    environmental_conditions: {
      type: environmentalConditionsSchema,
      required: true,
    },
    total_holes: Number,
    available_holes: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        enum: ['Forest Restoration', 'Urban Park', 'Wildlife Habitat', 'Other'],
        required: true
    },
    images: {
        type: [String],
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})
// In your PlantingSite model
plantingSiteSchema.index({ location: '2dsphere' });

PlantingSite = mongoose.model('PlantingSite', plantingSiteSchema)

module.exports = PlantingSite

