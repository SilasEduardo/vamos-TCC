const Database = require('../../models/index')
const { Op } = require("sequelize");

class ProjetoService {
    constructor() {
        this.Projeto = Database['projeto']
    }

    async getAll() {
        try {
            const projeto = await this.Projeto.findAll({
                
                include: [
                    {
                        association: 'projetosAssistidos',
                        attributes: ['id', 'nome']
                    }
                ]
            })

            const projetoTotal = projeto.map( (projeto) => {
                let lengthAssistidos = projeto.dataValues.projetosAssistidos.length
                return projeto.dataValues.total = lengthAssistidos
            })
            return projeto

        } catch (error) {

            return false
        }
    }

    async getId(id) {
        try {
            const projetoId = await this.Projeto.findByPk(id, {
                include: [
                    {
                        association: 'projetosAssistidos',
                        attributes: ['id', 'nome']
                    },
                ]
            })

            if(!projetoId){
                return false
            }
            
            const lengthAssistidos = projetoId.dataValues.projetosAssistidos.length
            // console.log(projetoId.dataValues.projetosAssistidos[0].dataValues = lengthAssistidos)
            projetoId.dataValues.total = lengthAssistidos
            

            return projetoId
        } catch (error) {

            return false
        }
    }

    async create(projeto) {
        try {
            const { nome, descricao, local } = projeto
            return await this.Projeto.create({nome, descricao, local})
        } catch (error) {

            return false
        }
    }

    async destroy(id){
        try {
            const projetoId = await this.Projeto.findByPk(id)

            await projetoId.destroy()
            return true
        } catch (error) {
            return false
        }
    }

    async edit (projeto) {
        try {
        const id = projeto.id
        const dataProjeto = projeto.data

        const projeto_id = await this.Projeto.findByPk(id)

        const updateProjeto = {
            nome: dataProjeto.nome,
            descricao: dataProjeto.descricao,
            local: dataProjeto.local,
        }
        
        return await projeto_id.update(updateProjeto)
        } catch (error) {
        return undefined
        }
    }


}

module.exports = new ProjetoService