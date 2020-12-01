const Database = require('../../models/index')

class TelefoneAssistencia {
    constructor() {
        this.Telefone = Database['telefone']
        this.TipoTelefone = Database['tipo_telefone']
    }

    async create(telefone) {
        try {

            
            const ddd = telefone.numero.substring(0,2)
            const numero = telefone.numero.substring(2)
            telefone.ddd = ddd
            telefone.numero = numero

            return await this.Telefone.create(telefone)
        } catch (error) {
            return error
        }
    }

    async getTipoTelefone(){
        try {
            const tipo_telefone =  await this.TipoTelefone.findAll()
            console.log('entrouuu')
            console.log(tipo_telefone)
            return tipo_telefone
        } catch (error) {
            return error
        }
    }


    async edit(telefone) {
        try {
            const id = telefone.id

            const telefone_id = await this.Telefone.findByPk(id)

            const { ddd, numero, id_tipo } = telefone_id.dataValues

            const update_telefone = {
                ddd: ddd,
                numero: numero,
                id_tipo: id_tipo,

            }
            await assistido_id.update(update_telefone)
            return true
        } catch (error) {
            return undefined
        }
    }
}
module.exports = new TelefoneAssistencia