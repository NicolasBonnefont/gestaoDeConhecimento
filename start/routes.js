'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('login')

// rotas para as API
Route.post('/login','LoginController.login')
Route.on('/principal').render('principal')
Route.on('/usuario').render('cadastro/usuarios')


// GRUPO QUE REQUER AS ROTAS AUTENTICADAS
Route.group(() => {
  Route.post('/api/Usuario','UsuarioController.store')
  Route.get('/api/Usuario','UsuarioController.index')
  Route.get('/api/Usuario/:id','UsuarioController.show')
  Route.post('files', 'FileController.store')
  Route.delete('files/:id', 'FileController.destroy')

}).middleware('auth')

// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('404')