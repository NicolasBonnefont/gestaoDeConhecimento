'use strict'

const Usuarios = use('App/Models/Usuario')

const Env = use('Env')


class UsuarioController {

  async store({ response, request, params, auth }) {


    const data = request.all()

    const usuario = await Usuarios.create(data)

    await usuario.save()

    return usuario

  }

  async index({ response, request }) {
    const data = Usuarios.all()

    return data
  }

  async show({ request, response, params }) {

    const data = await Usuarios.findByOrFail('id', params.id)

    return data

  }

  async update({ request, response, params }) {
    const data = await request.all()

    let usuario = await Usuarios.findByOrFail('id', params.id)

    await usuario.merge(data)
    await usuario.save()

    return usuario
  }

  async destroy({ response,params }) {
    const user = await Usuarios.findByOrFail('id', params.id)

    await user.delete()

    return response.status(200).send({ ok: 'Deletado com sucesso' })
  }



}

module.exports = UsuarioController
