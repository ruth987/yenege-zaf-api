const { query } = require('express')
const PlantingSite = require('../models/plantingSite.model')
const {
    isValidGeoJSON,
    plantingSiteExistsWithOverlappingLocation,
} = require('../utils/plantingSiteHelpers')
const { Geocoder } = require('satelize-lts')

const createPlantingSite = async (req, res) => {
    try {
        // 1. Validate required fields on server-side (optional)
        const requiredFields = [
            'name',
            'description',
            'location',
            'area',
            'environmental_conditions',
        ]
        const missingFields = requiredFields.filter((field) => !req.body[field])
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({
                    message: `Missing required fields: ${missingFields.join(', ')}`,
                })
        }

        // 2. Check for existing planting site with same name
        const existingSiteWithName = await PlantingSite.findOne({
            name: req.body.name,
        })
        if (existingSiteWithName) {
            return res
                .status(400)
                .json({
                    message: 'Planting site with the same name already exists',
                })
        }

        // 4. Check for existing planting site with overlapping location (complex)
        // const isLocationOverlapping = await plantingSiteExistsWithOverlappingLocation(req.body.location);
        // if (isLocationOverlapping) {
        //   return res.status(400).json({ message: 'Planting site with overlapping location already exists' });
        // }

        // 5. Validate available holes (non-negative)
        if (req.body.available_holes <= 0) {
            return res
                .status(400)
                .json({ message: 'Available holes cannot be zero or negative' })
        }

        // 6. Create and save planting site if all validations pass
        const newPlantingSite = new PlantingSite(req.body)
        await newPlantingSite.save()
        res.status(201).json(newPlantingSite)
    } catch (error) {
        console.error(error)

        // Handle Mongoose validation errors (if any)
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            )
            return res
                .status(400)
                .json({
                    message: 'Validation errors:',
                    errors: validationErrors,
                })
        } else if (error.message === 'Invalid GeoJSON location format') {
            // Handle specific GeoJSON validation error
            return res.status(400).json({ message: error.message })
        }

        // Generic error handling
        res.status(500).json({ message: 'Error creating planting site' })
    }
}

const getPlantingSites = async (req, res) => {
    try {
        const { userLocation, category, soilType, sunExposure, minArea, maxArea, minAvailableHoles, maxAvailableHoles } = req.query;
    
        const filters = {};
    
        if (category) {
          filters.category = category;
        }
    
        if (soilType) {
          filters['environmental_conditions.soil_type'] = soilType;
        }
        if (sunExposure) {
          filters['environmental_conditions.sun_exposure'] = sunExposure;
        }

        if (minArea) {
          filters.area = { $gte: minArea };
        }
        if (maxArea) {
          filters.area = filters.area ? { ...filters.area, $lte: maxArea } : { $lte: maxArea };
        }
    
        if (minAvailableHoles) {
          filters.available_holes = { $gte: minAvailableHoles };
        }
        if (maxAvailableHoles) {
          filters.available_holes = filters.available_holes ? { ...filters.available_holes, $lte: maxAvailableHoles } : { $lte: maxAvailableHoles };
        }
    
        let plantingSites;
    
        if (userLocation) {
        plantingSites = await PlantingSite.find(filters);

          const userLocationPoint = {
            type: 'Point',
            coordinates: userLocation.split(',').map(Number),
          };
    
          plantingSites = await PlantingSite.aggregate([
            {
              $geoNear: {
                near: userLocationPoint,
                distanceField: 'distance',
                spherical: true,
                query: filters,
              },
            },
            { $sort: { distance: 1 } },
            { $limit: 2 },
          ]);
        } else {
          plantingSites = await PlantingSite.find(filters);
        }
    
        res.json(plantingSites);
      } catch (error) {
        console.error('Error finding planting sites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getPlantingSiteById = async (req, res) => {
    try {
        const plantingSite = await PlantingSite.findById(req.params.id)
        if (!plantingSite) {
            return res.status(404).json({ message: 'Planting site not found' })
        }
        res.json(plantingSite)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving planting site' })
    }
}

const updatePlantingSite = async (req, res) => {
    try {
        const plantingSite = await PlantingSite.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        )
        if (!plantingSite) {
            return res.status(404).json({ message: 'Planting site not found' })
        }
        res.json(plantingSite)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating planting site' })
    }
}

const deletePlantingSite = async (req, res) => {
    try {
        const plantingSite = await PlantingSite.findByIdAndDelete(req.params.id)
        if (!plantingSite) {
            return res.status(404).json({ message: 'Planting site not found' })
        }
        res.json({ message: 'Planting site deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error deleting planting site' })
    }
}

const findNearestPlantingSites = async (req, res) => {
    try {
        const userLocation = req.body

        if (!userLocation || !userLocation.type || !userLocation.coordinates) {
            throw new Error('Invalid user location format')
        }

        const userLocationPoint = {
            type: 'Point',
            coordinates: userLocation.coordinates,
        }

        const plantingSites = await PlantingSite.aggregate([
            {
                $geoNear: {
                    near: userLocationPoint,
                    distanceField: 'distance',
                    spherical: true,
                    query: {
                        // depending on the way the user wants to filter things
                    },
                },
            },
            {
                $sort: {
                    distance: 1,
                },
            },
            {
                $limit: 6,
            },
        ])

        return res.json(plantingSites)
    } catch (error) {
        console.error('Error finding nearest planting sites:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
module.exports = {
    createPlantingSite,
    getPlantingSites,
    getPlantingSiteById,
    updatePlantingSite,
    deletePlantingSite,
    findNearestPlantingSites,
}
