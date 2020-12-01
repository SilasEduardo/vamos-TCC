const router = require('express').Router()
const assistidoControllers = require('../controllers/AssistidoControllers')
const enderecoControllers = require('../controllers/EnderecoControllers')
const projetoControllers = require('../controllers/ProjetoControllers')
const eventoControllers = require('../controllers/EventoControllers')
const telefoneController = require('../controllers/telefoneController')
const estadoCivil = require('../controllers/estadoCivilController')
const usuarioController = require('../controllers/UsuarioController')
const autenticacao = require('../helpers/authenticate')
const multer = require('multer')
const uploadArquivos = require('../helpers/multer')
const configMulter = require('../helpers/configMulter')


// Assistidos
router.post('/assistidos', assistidoControllers.store)
router.get('/assistidos/:id', assistidoControllers.getById)
router.get('/assistidos/', assistidoControllers.getAll)
router.put('/assistidos/:id', assistidoControllers.edit)
router.delete('/assistidos/:id', assistidoControllers.destroy)

// Endereço
router.get('/enderecos', enderecoControllers.getAll)
router.put('/enderecos/:id', enderecoControllers.edit)
router.delete('/enderecos/:id', enderecoControllers.destroy)
router.post('/assistidos/:id_assistido/enderecos', enderecoControllers.store)

//Projeto
router.get('/projetos', projetoControllers.getAll)
router.get('/projetos/:id', projetoControllers.getById)
router.post('/projetos', projetoControllers.store)
router.delete('/projetos/:id', projetoControllers.destroy)
router.put('/projetos/:id', projetoControllers.edit)

//Evento
router.get('/eventos', eventoControllers.getAll)
router.get('/eventos/:id', eventoControllers.getById)
router.post('/eventos', eventoControllers.store)
router.delete('/eventos/:id', eventoControllers.destroy)
router.put('/eventos/:id', eventoControllers.edit)

router.post('/telefone', telefoneController.store)
router.post('/tipoTelefone', telefoneController.tipoTelefone)
router.get('/tipoTelefone', telefoneController.getTipoTelefone)

// Estado Civil
router.post('/estado-civil', estadoCivil.store)
router.get('/estado-civil', estadoCivil.getAll)

// Usuario
router.post('/usuarios', usuarioController.store)

// Autenticação
router.post('/autenticacao', autenticacao.autenticacao)


router.post('/upload', multer(configMulter).single('file') ,uploadArquivos.uploadArquivos)



module.exports = router