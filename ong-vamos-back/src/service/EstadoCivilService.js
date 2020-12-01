const Database = require('../../models/index')

class EstadoCivilService {
    constructor() {
        this.estadoCivil = Database.estado_civil
    }

    async create(estadoCivil) {
        try {
            return await this.estadoCivil.create(estadoCivil)
        } catch (error) {
            return error
        }
    }


    async getAll() {
        try {
            const listestadoCivil = await this.estadoCivil.findAll()

            return listestadoCivil
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = new EstadoCivilService
