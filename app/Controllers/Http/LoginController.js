'use strict'

const Usuarios = use('App/Models/Usuario')

const Env = use('Env')


class LoginController {

  async login({ response, request, params, auth }) {


    const { Usuario, Senha } = request.all()

    const token = await auth.attempt(Usuario, Senha)

    return token

  }

}

module.exports = LoginController
