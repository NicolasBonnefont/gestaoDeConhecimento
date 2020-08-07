'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('login')

// rotas para as API
Route.post('/login','LoginController.login')
Route.on('/principal').render('principal')
Route.on('/usuario').render('cadastroUsuario/usuarios')
Route.on('/cadastroTopico').render('cadastroTopico/topicos')
Route.on('/editarTopico').render('cadastroTopico/editarTopico')
Route.get('/files/:id', 'FileController.show')
Route.on('/topicos').render('topicos/topicos')
Route.on('/subTopicos').render('topicos/subTopicos')
Route.on('/detalhe').render('topicos/detalhe')
Route.on('/pesquisa').render('pesquisa/pesquisa')
Route.on('/perfil').render('perfil/perfil')



// GRUPO QUE REQUER AS ROTAS AUTENTICADAS
Route.group(() => {
  Route.post('/api/Usuario','UsuarioController.store')
  Route.get('/api/Usuario','UsuarioController.index')

  Route.get('/api/logado','LoginController.logado')
  Route.get('/api/Usuario/:id','UsuarioController.show')
  Route.put('/api/Usuario/:id','UsuarioController.update')
  Route.delete('/api/Usuario/:id','UsuarioController.destroy')
  Route.post('files', 'FileController.store')
  Route.delete('files/:id', 'FileController.destroy')
  Route.get('files/:id', 'FileController.download')


  Route.post('/api/Topico','TopicoController.store')
  Route.get('/api/Topico/:id','TopicoController.show')
  Route.get('/api/Topico','TopicoController.index')
  Route.delete('/api/Topico/:id','TopicoController.delete')
  Route.put('/api/Topico/:id','TopicoController.update')

  Route.post('/api/subTopico','SubtopicoController.store')
  Route.get('/api/subTopico/:id','SubtopicoController.index')
  Route.get('/api/subTopico/detalhe/:id','SubtopicoController.show')
  Route.put('/api/subTopico/:id','SubtopicoController.update')
  Route.delete('/api/subTopico/:id','SubtopicoController.destroy')

  Route.post('/api/pesquisa','SubtopicoController.pesquisar')


}).middleware('auth')

Route.get('/api/allCep','CepController.index')
Route.post('/api/atualizaCEP','CepController.atualizaCEP')

// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('404')