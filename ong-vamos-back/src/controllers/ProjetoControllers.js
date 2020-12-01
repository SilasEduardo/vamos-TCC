const projetoService = require('../service/ProjetoService')
class Projeto{
    
    async getAll(req, res){
        try {
            const resp = await projetoService.getAll()
    
            return res.status(200).json(resp)
        } catch (error) {
            return undefined
        }
    }

    async getById(req, res){
        
        try {
            const { id } = req.params

            const resp = await projetoService.getId(id)
            
            if(resp === false){
                return res.status(404).json('Projeto não encontrado')
            }
            return res.status(200).json(resp)
        } catch (error) {

            return res.status(500).json(error)
        }
    }

    async store(req, res){
        try {
            const { nome, descricao, local} = req.body

            let projeto ={
                nome,
                descricao,
                local,
            }
            
            await projetoService.create(projeto)
            
            return res.status(200).send('Create')
        } catch (error) {

            return res.status(500).send(error)
        }

    }

    async destroy(req, res) {
        try {
            const { id } = req.params

            const resp = await projetoService.destroy(id)

            if(resp != true){
                return res.status(400)
            }

            return res.status(200).json('deleted')
        } catch (error) {

            return res.status(500).json(error)
        }
    }

    async edit(req, res){

        try {
            const body_params = req.body
            const { id } = req.params
            const projeto = {
                id,
                data: body_params
            }
            const resp = await projetoService.edit(projeto)
            if(!resp){
                return res.status(400).json('Não editado')
            }
            return res.status(200).json('ok')

        } catch (error) {
            return res.status(500).json(erro) 
        }
    }


}

module.exports = new Projeto