const cadastroAssistidoService = require('../service/AssistidoService')
const enderecoService = require('../service/EnderecoService')
const telefoneService = require('../controllers/telefoneController')
const projetoService = require('../service/ProjetoService')
const eventoService = require('../controllers/EventoControllers')


class Assistido {

    async getAll(req, res) {
        try {
            const resp = await cadastroAssistidoService.getAll()
            return res.status(200).json(resp)
        } catch (error) {

        }
    }

    async getById(req, res) {

        try {
            const { id } = req.params

            const resp = await cadastroAssistidoService.getId(id)
            return res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }


    async edit(req, res) {

        try {

            const { assistido, endereco, telefone } = req.body

            console.log(assistido)
            console.log(endereco)
            console.log(telefone)
            const { id } = req.params
            // const assistido = {
            //     id,
            //     data: body_params
            // }
            await cadastroAssistidoService.edit(assistido)
            await enderecoService.edit(endereco)
            await telefoneService.edit(telefone)

            if (resp != true) {
                return res.status(400)
            }
            return res.status(200)

        } catch (error) {
            console.log(error)
            return res.status(500).json(erro)
        }
    }

    async store(req, res) {
        try {
            const { assistido, endereco, telefone } = req.body  
            

            const respAssistido = await cadastroAssistidoService.create({assistido})
            
            if (!respAssistido.dataValues.id) {
                return res.status(400).json({ error: 'Erro ao cadastrar' })
            }

            endereco.id_assistido = await respAssistido.dataValues.id
            telefone.id_assistido = await respAssistido.dataValues.id
            await telefoneService.store(telefone)
            await enderecoService.create(endereco)

            return res.status(200).send('Create')
        } catch (error) {
            return res.status(500).send(error)
        }

    }

    async destroy(req, res) {
        try {
            const { id } = req.params

            const resp = await cadastroAssistidoService.destroy(id)

            if (resp != true) {
                return res.status(400)
            }

            return res.status(200).json('deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = new Assistido



