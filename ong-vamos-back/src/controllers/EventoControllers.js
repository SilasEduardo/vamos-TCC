const eventoService = require('../service/EventoService')
class Evento{

    async getAll(req, res){
        try {
            const resp = await eventoService.getAll()
            return res.status(200).json(resp)
        } catch (error) {
            
        }
    }

    async getById(req, res){
        
        try {
            const { id } = req.params

            const resp = await eventoService.getId(id)
            return res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async store(req, res){
        try {
            const evento = req.body
            console.log(evento)
            const respAssistido = await eventoService.create(evento)


            return res.status(200).send('Create')
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }

    }

    async edit(req, res){

        try {
            const body_params = req.body
            const { id } = req.params
            const evento = {
                id,
                data: body_params
            }
            const resp = await eventoService.edit(evento)

            if(!resp){
                return res.status(400).json()
            }
            return res.status(200).json('ok')

        } catch (error) {
            return res.status(500).json(erro) 
        }
    }


    async destroy(req, res) {
        try {
            const { id } = req.params

            const resp = await eventoService.destroy(id)

            if(resp != true){
                return res.status(400)
            }

            return res.status(200).json('deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new Evento