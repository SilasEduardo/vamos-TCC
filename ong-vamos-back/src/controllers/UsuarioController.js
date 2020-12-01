const usuarioService = require('../service/UsuarioService')

class Usuario {
    async store(req, res){
        try {
            const usuario = req.body

            const novoUsuario = await usuarioService.create(usuario)

            return res.status(201).json('Usuário criado com sucesso')

        } catch (error) {
            return res.status(500).json('Not Created')
        }
    }
}

module.exports = new Usuario