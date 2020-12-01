const Database = require('../../models')
const bcrypt = require('bcrypt')

class usuarioService {
    constructor() {
        this.Usuario = Database.usuarios
    }

    async create(usuario) {
        try {
            const senha = usuario.senha

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha, salt)

            usuario.senha = hash



            return await this.Usuario.create(usuario)
        } catch (error) {
            console.log(error)
            return false
        }
    }


}

module.exports = new usuarioService