'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login','UsuarioController.logar')
Route.post('/usuario','UsuarioController.store').middleware(['auth'])
