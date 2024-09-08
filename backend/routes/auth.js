const express = require('express')
const { createUserRole, getAllUsers, deleteUser, login } = require('../controller/authController')

const router = express.Router()

router.post('/create-role' , createUserRole)
router.get('/allUsers' , getAllUsers)
router.delete('/deleteUser/:id' , deleteUser)
router.post('/login', login)


module.exports = router