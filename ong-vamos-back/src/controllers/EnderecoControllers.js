const enderecoService = require('../service/EnderecoService')
class Endereco {


    async getAll(req, res){
        try {

            const resp = await enderecoService.getAll()
            return res.status(200).json(resp)
        } catch (error) {
            
        }
    }

    async edit(req, res){

        try {
            const body_params = req.body
            const { id } = req.params
            const endereco = {
                id,
                data: body_params
            }
            const resp = await enderecoService.edit(endereco)

            if(resp != true){
                return res.status(400)
            }
            return res.status(200).send('edited')

        } catch (error) {
            return res.status(500).json(erro) 
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params

            const resp = await enderecoService.destroy(id)

            if(resp != true){
                return res.status(400)
            }

            return res.status(200).json('deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async store(req, res){
        try {
            const endereco = req.body
            const params = req.body
            params.id_assistido = req.params.id_assistido
            await enderecoService.create(endereco)
            return res.status(200).send('Create')
        } catch (error) {
            return res.status(500).send(error)
        }

    }



}

module.exports = new Endereco