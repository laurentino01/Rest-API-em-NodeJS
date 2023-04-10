# RestAPI

### Rest API feita com NodeJs seguindo o padrão de arquitetura "MVC" e de ODM o mongoose. O projeto consiste um CRUD simples para um banco de dados local.

## Tecnologias 
<div style="display: inline_block"><br>
  <img align="center" alt="Gabriel-HTML" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"> -
  <img align="center" alt="Gabriel-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg">
</div>

## Routes
<code>
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
</code>

## Controllers
<code>
const mongoose = require ('mongoose')
const Usuario = mongoose.model('Usuario')
module.exports = {
    async insert (req, res){
        const usuarios = await Usuario.create(req.body)
        return res.json(usuarios)
    },
    async index (req, res){
        const { page } = req.query
        const usuarios = await Usuario.paginate({}, {page, limit: 5})
        return res.json(usuarios)
    },
    async details (req, res){
        const usuarios  = await Usuario.findById(req.params.id)
        return res.json(usuarios)
    },
    async update (req, res){
        const usuarios  = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.json(usuarios)
    },
    async delete(req, res){
        await Usuario.findByIdAndRemove(req.params.id)
        return res.send()
    }
}
</code>

## Models 

<code>
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true,
        uppercase: true,
        minlength: 3,
        maxlength: 100
    },
    matricula:{
        type: Number,
        require: true,
        min: 1,
        max: 9999,
        unique: true
    },
    ativo:{
        type: Boolean,
        default: true,
        require: true
    },
    endereco:{
        cidade:{
            type: String,
            require: true,
            minlength: 3,
            maxlength: 100
        },
        estado:{
            type: String,
            require: true,
            minlength: 2,
            maxlength: 2,
        }
    },
    registro: {
        type: Date,
        default: Date.now
    }

})
UserSchema.plugin(mongoosePaginate)
mongoose.model('Usuario', UserSchema)
</code>


