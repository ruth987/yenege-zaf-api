const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    checkPermission
} = require('../controllers/user.controller')

router.get('/', auth, getUsers)

router.get('/:id', auth, getUser)

router.delete('/:id', auth, deleteUser)

router.put('/:id', auth, updateUser)

router.post('/location-permission', auth, )

module.exports = router
