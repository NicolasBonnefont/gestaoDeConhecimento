'use strict'
const SubTopico = use('App/Models/Subtopico')
const Topicos = use('App/Models/Topico')

class SubTopicoController {

  async store({ request, response }) {

    const {id_topico, Titulo, Descricao} = await request.all()

    console.log(id_topico)
    const existeTopico = await Topicos.findByOrFail('id', id_topico)

    if(existeTopico){
      const subTopico = SubTopico.create({id_topico, Titulo, Descricao})

      return subTopico

    }else{

      return response.status(404).send({mensagem:'Topico não localizado ! '})
    }

  }
  async update({request, params}){
    const {id_topico, Titulo, Descricao} = await request.all()

    try{
      const subTopico = await SubTopico.findByOrFail('id', params.id, 'id_topicos', id_topico)
    }catch(erro){

    }
  }
  async show({response, params}){
    const subTopico = await SubTopico.query()
    .where('id_topico', params.id).fetch()

    return subTopico
  }
}

module.exports = SubTopicoController
