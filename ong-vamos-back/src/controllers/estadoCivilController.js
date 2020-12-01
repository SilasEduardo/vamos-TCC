const estadoCivilService = require('../service/EstadoCivilService')

class EstadoCivil {

    async store(req, res) {
        try {
            const estadoCivil = req.body
            await estadoCivilService.create(estadoCivil)

            return res.status(201).json({Status: 'Created'})
        } catch (error) {
            return res.status(500).send(error)
        }

    }


    async getAll(req, res) {
        try {
            const resp = await estadoCivilService.getAll()
            return res.status(200).json(resp)
        } catch (error) {

            console.log(error)
            return res.status(500).json(error) 
        }
    }
}

module.exports = new EstadoCivil