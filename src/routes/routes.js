const express = require('express')

const routes = express.Router()

const userController = require('../controllers/userController')
//insert
routes.post('/usuarios', userController.insert)
//index
routes.get('/usuarios/', userController.index)
//details
routes.get('/usuarios/:id', userController.details)
//atualiza
routes.put('/usuarios/:id', userController.update)
//deleta
routes.delete('/usuarios/:id', userController.delete)

module.exports = routes  

