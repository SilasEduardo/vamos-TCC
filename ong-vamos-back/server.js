const express = require('express')
const server = express()
const port = 3003
const rotas = require('./src/routes/routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

server.use(session({
    secret: 'A@w050u6-043',
    cookie : { maxAge: 30000 },
    resave: true,
    saveUninitialized: true
}))

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use('/api/v1', rotas)



server.listen(process.env.PORT || port, () => {
    console.log('server rodando')
})