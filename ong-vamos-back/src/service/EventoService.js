const DataBase = require('../../models/index')
class EventoSevice{
    constructor(){
        this.Evento = DataBase.evento
    }

    async getAll () {
    try {
        const listEvento = await this.Evento.findAll()
        return listEvento
        } catch (error) {
        return error
        }
    }

    async getId (id) {
        try {
            return await this.Evento.findByPk(id)
        } catch (error) {
            return error
        }
    }

    async create (evento) {
        try {

            return await this.Evento.create(evento)
        } catch (error) {
            return error
        }
    }

    async edit (evento) {
        try {
        const id = evento.id
        const dataEvento = evento.data

        const evento_id = await this.Evento.findByPk(id)

        const updateEvento = {
            nome: dataEvento.nome,
            descricao: dataEvento.descricao,
            data: dataEvento.data,
            id_projeto: dataEvento.id_projeto
        }
        
        return await evento_id.update(updateEvento)
        } catch (error) {
        return undefined
        }
    }

    async destroy (id) {
        try {
            const evento = await this.Evento.findByPk(id)

            await evento.destroy()
            return true
        } catch (error) {
            return error
        }
    }
}

module.exports = new EventoSevice