const express = require('express')
// const user = require('../models/user')
const router = express.Router()
const { handleGetAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user')

/* this is for browser which returns html  */
router
.route('/')
.get(handleGetAllUsers)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

module.exports = router