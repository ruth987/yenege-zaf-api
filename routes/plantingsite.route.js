const express = require('express')
const router = express.Router()

const {
    createPlantingSite,
    getPlantingSites,
    getPlantingSiteById,
    updatePlantingSite,
    deletePlantingSite,
    findNearestPlantingSites,
} = require('../controllers/plantingsite.controller')

router.post('/createplantingsite', createPlantingSite)

router.get('/nearest', findNearestPlantingSites);

router.get('/', getPlantingSites)

router.get('/:id', getPlantingSiteById)

router.put('/:id', updatePlantingSite)

router.delete('/:id', deletePlantingSite)


module.exports = router


