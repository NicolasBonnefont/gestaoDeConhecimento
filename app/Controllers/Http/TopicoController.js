'use strict'

const Topicos = use('App/Models/Topico')

class TopicoController {

  async store({ request, response, params }) {

    console.log('teste')
    const data = await request.all()

    console.log(data)

    const topico = await Topicos.create(data)
    await topico.save()

    return topico
  }
  async index({ request, response, params }) {
    const topicos = await Topicos.all()

    return topicos
  }
  async show({ request, response, params }) {
    try {
      // localhost:topicos/2
      const topicos = await Topicos.findByOrFail('id', params.id)

      return topicos
    } catch (erro) {
      return response.status(400).send({ Mensagem: 'Problema ao buscar este tópico' })

    }

  }
  async delete ({request, response, params}){
    const topico = await Topicos.findByOrFail('id', params.id)

    if(topico){
      await topico.delete()

      return response.status(200).send({Mensagem: "Tópico deletado com sucesso"})
    }else{
      return response.status(404).send({Mensagem: "Tópico não localizado ! "})
    }
  }
  async update({request, response, params}){
    
    const topico = await Topicos.findByOrFail('id', params.id)
    const data = await request.all()

    await topico.merge(data)
    await topico.save()

    return topico

  }


}

module.exports = TopicoController
