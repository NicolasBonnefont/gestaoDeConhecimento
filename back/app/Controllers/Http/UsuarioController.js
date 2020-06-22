'use strict'
const Usuario = use('App/Models/User')


class UsuarioController {

  async logar ({request, response, auth}){
    const {usuario, senha} = await request.all()

    const token = await auth.attempt(usuario, senha)

    if(!token){
      return response.status(401).send({Mensagem:"Não autorizado !"})
    }

    return token
  }

  async store ({request, response}){
    const data = await request.all()

    try{
      const usuario = await Usuario.create(data)

      usuario.save()

      return usuario

    }catch(err){
      return response.status(500).send({Erro:"Erro ao cadastrar usuáro ", err})
    }

  }

  async index ({request, response}){

    const data = await Usuario.all()

    return data
  }

  async update ({request, response, params}){
    const data = await request.all()

    const usuario = await Usuario.findByOrFail('id', params.id)

    await usuario.merge(data)
    usuario.save()

    return Usuario.all()
  }
}

module.exports = UsuarioController
