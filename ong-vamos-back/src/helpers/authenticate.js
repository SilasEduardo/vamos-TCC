const Database = require('../../models/index')
const bcrypt = require('bcrypt')

class Autheticate {

    constructor() {
        this.Usuario = Database.usuarios
    }

    async autenticacao(req, res) {
        try {
            const { email, senha } = req.body
            const usuarioValido = await Database.usuarios.findOne({ where: { email: email } })
            
            if (!usuarioValido) {

                return res.status(404).json({ Response: 'Usuário não encontrado' })
            }

            const senhaCorreta = await bcrypt.compareSync(senha, usuarioValido.senha)

            if (!senhaCorreta) {
                return res.status(404).json({ Response: 'Senha inválida' })
            }

            req.session.user = {
                id: usuarioValido.id,
                email: usuarioValido.email
            }
            return res.status(200).json({ Response: 'Login realizado com sucesso' })


        } catch (error) {
            console.log(error)
            return res.status(500).json({Response: 'Erro na autenticação'})
        }
    }



}

module.exports = new Autheticate