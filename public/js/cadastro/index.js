async function cadastrarUsuario() {
  event.preventDefault()
  var url = ''
  const imgNovo = document.getElementById('imgNovo').files[0]

  let data = new FormData()
  data.append("file", imgNovo)

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
    'Content-Type': 'multipart/form-data'
  };

  await axios.post('/files', data, config)

    .then(function (response) {
      url = response.data.url
    })


  await axios.post('/api/usuario',

    {
      "usuario": document.getElementById('usuario').value,
      "senha": document.getElementById('senha').value,
      'url': url
    }, config)
    .then(function (response) {
      alert('Usuario Cadastrado com sucesso ! ')
      document.getElementById('formCadastro').reset()
      location.reload()
    })
    .catch(function (erro) {
      console.log(erro)
      alert('Problema ao cadastrar Usuário !')
      document.getElementById('formCadastro').reset()
    })
}

async function alterarUsuario() {
  event.preventDefault()

}
async function carregaUsuario() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` }
  };

  await axios.get('/api/usuario', config)
    .then(function (response) {
      let usuarios = response.data
      let html = "<option value= '0'>...</option>"
      usuarios.map(usuario => (
        html += `<option value="${usuario.id}">${usuario.Usuario}</option>`
      ))
      document.getElementById('usuariosSelect').innerHTML = html

    })
    .catch(function (erro) {

      alert('')
    })

}
async function igualaUsuario() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` }
  };

  let usuarioSelecionado = document.getElementById('usuariosSelect').value

  if (usuarioSelecionado > 0) {

    await axios.get('/api/usuario/' + usuarioSelecionado, config)
      .then(function (response) {
        document.getElementById('fieldset').disabled = false
        document.getElementById('usuarioAltera').value = response.data.Usuario
        document.getElementById('imgAltera').src = response.data.url

      })
      .catch(function (erro) {

      })

  } else {
    document.getElementById('formAltera').reset()
    document.getElementById('fieldset').disabled = true
  }

}
carregaUsuario()
function showImageNovo() {
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgNovo = document.getElementById("imageNovo")
      imgNovo.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}

function showImageAltera() {
  console.log("NOVO IMG ")
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgAltera = document.getElementById("imageAltera")
      imgAltera.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}