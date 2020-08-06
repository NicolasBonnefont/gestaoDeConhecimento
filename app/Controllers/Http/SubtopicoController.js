'use strict'
const SubTopico = use('App/Models/Subtopico')
const Topicos = use('App/Models/Topico')
const Database = use('Database')

class SubTopicoController {

  async store({ request, response, auth }) {

    const { id_topico, Titulo, Descricao, Status } = await request.all()
    const { Usuario } = await auth.getUser()

    console.log(id_topico)
    const existeTopico = await Topicos.findByOrFail('id', id_topico)

    if (existeTopico) {
      const subTopico = SubTopico.create({ id_topico, Titulo, Descricao, Usuario, Status })

      return subTopico

    } else {

      return response.status(404).send({ mensagem: 'Topico não localizado ! ' })
    }

  }
  async update({ request, params, auth }) {
    const { Titulo, Descricao, Status } = await request.all()

    const subTopico = await SubTopico.find(params.id)
    const { Usuario } = await auth.getUser()
    const UsuarioAlteracao = Usuario

    if (subTopico) {
      await subTopico.merge({ Titulo, Descricao, UsuarioAlteracao, Status })
      await subTopico.save()
      return subTopico
    } else {
      return response.status(404).send({ mensagem: "Topico inválido para alteração" })
    }
  }
  async index({ response, params }) {
    const subTopico = await SubTopico.query()
      .where('id_topico', params.id).fetch()

    return subTopico
  }
  async show({ request, params, response }) {

    const subTopico = await SubTopico.find(params.id)
    if (subTopico) {
      return subTopico
    } else {
      return response.status(404).send({ mensagem: "SubTopico nao encotrado ! " })
    }

  }

  async pesquisar({ request, response, params }) {
    const { Pesquisa } = await request.all()

    let pesquisa = await Database.raw(`
      SELECT * FROM topicos WHERE Titulo LIKE "%%%${Pesquisa}%%%"
      OR Descricao LIKE "%%%${Pesquisa}%%%" `)
    console.log(pesquisa[0])

    if (pesquisa[0].length >= 1) {
      console.log('1')

      let resultado = await Database.raw(`SELECT * FROM subtopicos WHERE id_topico = "${pesquisa[0][0].id}"`)

      return resultado[0]
    }
    if (pesquisa[0].length < 1) {
      console.log('2')

      let pesquisa2 = await Database.raw(`
      SELECT * FROM subtopicos WHERE Titulo LIKE "%%%${Pesquisa}%%%"
      OR Descricao LIKE "%%%${Pesquisa}%%%" `)
      return pesquisa2[0]

    }
    console.log('4')
    return pesquisa[0]
    /* return response.status(404).send({ Mensagem: 'Não encontrado' }) */

  }
  async destroy({ request, response, params }) {

    try {
      const subtopico = await SubTopico.find(params.id)
        await subtopico.delete()
        return response.status(200).send({ Mensagen: 'Subopico deletado com sucesso !' })

    } catch (erro) {
      return response.status(404).send({ Mensagen: 'Subopico inválido', erro })
    }

  }

  async fileUpload({reque, response, params}){

  }

}


module.exports = SubTopicoController
