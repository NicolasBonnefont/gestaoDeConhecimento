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

    const usuario = await Usuario.create(data)

    usuario.save()

    return usuario
  }
}

module.exports = UsuarioController
