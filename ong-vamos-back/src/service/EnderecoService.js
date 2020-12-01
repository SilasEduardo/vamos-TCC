const Database = require('../../models/index')

class EnderecoService {

    constructor() {
        this.Endereco = Database['endereco']
    }

    async getAll() {
        try {

            const listEndereco = await this.Endereco.findAll()
            return listEndereco
        } catch (error) {
            return error
        }
    }


    async edit(endereco) {
        try {
            const id = endereco.id
            const dataEndereco = endereco.data

            const endereco_id = await this.Endereco.findByPk(id)
            const { logradouro, cidade, cep, bairro, numero, complemento, numero_comodos, id_tipo_moradia } = endereco_id.dataValues

            const update_endereco = {
                logradouro: dataEndereco.logradouro,
                cidade: dataEndereco.cidade,
                cep: dataEndereco.cep,
                bairro: dataEndereco.bairro,
                numero: dataEndereco.numero,
                complemento: dataEndereco.complemento,
                numero_comodos: dataEndereco.numero_comodos,
                id_tipo_moradia: dataEndereco.id_tipo_moradia

            }
            await endereco_id.update(update_endereco)
            return true

        } catch (error) {
            return undefined
        }
    }

    async destroy(id) {
        try {
            const endereco_id = await this.Endereco.findByPk(id)

            await endereco_id.destroy()
            return true
        } catch (error) {
            return undefined
        }
    }

    async create(endereco) {
        try {
            await this.Endereco.create(endereco)
            return true
        } catch (error) {
            return undefined
        }

    }



}
module.exports = new EnderecoService