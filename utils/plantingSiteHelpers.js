const geojsonValidation = require('geojson-validation')
// const geolib = require('geolib');

async function plantingSiteExistsWithOverlappingLocation(locationData, PlantingSiteModel) {
    const query = {
        location: {
            $geoWithin: {
                $geometry: {
                    type: locationData.type, // GeoJSON type: "Polygon" or "MultiPolygon"
                    coordinates: locationData.coordinates, // Array of coordinates
                    crs: {
                        type: "name",
                        properties: {
                            name: "urn:x-mongodb:crs:strictwinding:EPSG:4326"
                        }
                    }
                },
            },
        },
    };

    const overlappingSites = await PlantingSiteModel.find(query);

    return overlappingSites.length > 0;
}


module.exports = { plantingSiteExistsWithOverlappingLocation }



