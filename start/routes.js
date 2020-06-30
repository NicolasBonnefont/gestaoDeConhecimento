'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('login')
Route.on('/principal').render('principal')
Route.on('/usuarios').render('cadastros/usuarios')


// rotas para as API
Route.post('/login','LoginController.login')


// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('404')
