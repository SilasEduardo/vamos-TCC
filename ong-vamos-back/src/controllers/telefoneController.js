const Database = require('../../models/index')
const telefoneService = require('../service/TelefoneService')
class Telefone {

    constructor() {
        this.Tip_telefone = Database.tipo_telefone
    }

    async store(telefone) {
        try {
            return await telefoneService.create(telefone)
        } catch (error) {
            return res.status(500).send(error)
        }

    }

    async tipoTelefone(req, res) {
        try {
            await Database.tipo_telefone.create(req.body)
            return res.status(201).json({ Status: 'Criado com sucesso' })
        } catch (error) {
            return res.status(500).send(error)
        }

    }

    async getTipoTelefone(req, res) {
        try {
            const tipoTelefone = await telefoneService.getTipoTelefone()
            console.log(tipoTelefone)
            return res.status(200).json(tipoTelefone)
        } catch (error) {
            return error
        }
    }



    async edit(telefone) {

        try {

            const resp = await telefoneService.edit(telefone)

            if (resp != true) {
                return res.status(400)
            }
            return res.status(200)

        } catch (error) {
            return false
        }
    }

}


module.exports = new Telefone