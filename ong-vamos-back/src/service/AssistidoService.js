const Database = require('../../models/index')
const { Op } = require("sequelize");

class CadastroAssistidoService {
  constructor() {
    this.Assistido = Database.assistido
    this.Telefone = Database.telefone
    this.Endereco = Database.endereco
    this.Projeto = Database.projeto
  }

  async getAll() {
    try {
      console.log(await this.Assistido.findAndCountAll())
      const listAssistidos = await this.Assistido.findAll({
        include: [
          {
            association: 'enderecos'
          },
          {
            association: 'estado_civil',
            attributes: ['descricao']
          },
          {
            association: 'telefone',
            attributes: ['id', 'ddd', 'numero'],
            include: {
              association: 'telefone_tipo',
              attributes: ['descricao'],
            }
          },
          {
            association: 'assisProj'
          }
        ]

      })

      return listAssistidos
    } catch (error) {
      return error
    }
  }

  async getId(id) {
    try {
      const assistidoId = await this.Assistido.findByPk(id, {
        include: [
          {
            association: 'enderecos'

          },
          {
            association: 'telefone',
            attributes: ['id', 'ddd', 'numero'],
            include: {
              association: 'telefone_tipo',
              attributes: ['descricao'],
            }            
          },
          {
            association: 'assisProj',
            attributes: ['id', 'nome','descricao'],
            through: { attributes: [] }
          }

        ]
      })
      return assistidoId
    } catch (error) {
      return false
    }
  }

  async edit(assistido) {
    try {
      const id = assistido.id
      const dataAssistido = assistido.data

      const assistido_id = await this.Assistido.findByPk(id)

      const update_assistido = {
        id_reponsavel: dataAssistido.id_reponsavel,
        nome: dataAssistido.nome,
        nascimento: dataAssistido.nascimento,
        cpf: dataAssistido.cpf,
        sexo: dataAssistido.sexo,
        id_escolaridade: dataAssistido.id_escolaridade,
        id_estado_civil: dataAssistido.id_estado_civil,
        status: dataAssistido.status,
        projeto: dataAssistido.projeto

      }
      await assistido_id.update(update_assistido)
      return true
    } catch (error) {
      return undefined
    }
  }

  async destroy(id) {
    try {
      const assistido_id = await this.Assistido.findByPk(id)

      await assistido_id.destroy()
      return true
    } catch (error) {
      return error
    }
  }

  async create(assistido) {
    try {
      const assistidoNovo = assistido.assistido
      const idProjeto = assistido.assistido.projeto
      delete assistido.assistido.projeto

      const novoAssistido = await this.Assistido.create(assistidoNovo)

      const dbProjeto = await this.Projeto.findByPk(idProjeto)
    

        if (idProjeto) {

          await novoAssistido.addAssisProj(dbProjeto)
        }
    

      return novoAssistido
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

module.exports = new CadastroAssistidoService()
