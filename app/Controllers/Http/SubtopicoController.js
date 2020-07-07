'use strict'
const SubTopico = use('App/Models/Subtopico')
const Topicos = use('App/Models/Topico')

class SubTopicoController {

  async store({ request, response, auth }) {

    const { id_topico, Titulo, Descricao } = await request.all()
    const {Usuario} = await auth.getUser()

    console.log(id_topico)
    const existeTopico = await Topicos.findByOrFail('id', id_topico)

    if (existeTopico) {
      const subTopico = SubTopico.create({ id_topico, Titulo, Descricao, Usuario })

      return subTopico

    } else {

      return response.status(404).send({ mensagem: 'Topico não localizado ! ' })
    }

  }
  async update({ request, params, auth }) {
    const {Titulo, Descricao} = await request.all()

    const subTopico = await SubTopico.find(params.id)
    const {Usuario} = await auth.getUser()
    const UsuarioAlteracao = Usuario

console.log(Titulo, Descricao, UsuarioAlteracao)

    if (subTopico) {
      await subTopico.merge({Titulo, Descricao, UsuarioAlteracao})
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

}

module.exports = SubTopicoController
