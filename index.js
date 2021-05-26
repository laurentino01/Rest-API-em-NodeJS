const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/curso', { useNewUrlParser:true, useUnifiedTopology: true})
        .then(()=>{console.log('MongoDB Conectado...')})
        .catch((err)=>{console.log('erro ao se conectar ' + err)})

requireDir('./src/models')
app.use('/sistema', require('./src/routes/routes.js'))

app.listen(3001, ()=>{
    console.log('Servidor Conectado...')
})
