async function cadastrarUsuario() {
  event.preventDefault()
  var url = ''
  var urlID = ''
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
      urlID = response.data.urlID
      console.log(response.data)
    })
console.log(urlID)
  await axios.post('/api/usuario',

    {
      "usuario": document.getElementById('usuario').value,
      "senha": document.getElementById('senha').value,
      'url': url,
      'urlID': urlID
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
  var url = ''
  const imageAltera = document.getElementById('imgNovo').files[0]

  let data = new FormData()
  data.append("file", imgNovo)

  if (!imageAltera == '') {

    await axios.delete("/files/" + urlID, configMultipart)

      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
        return alert("Houve um problema, verificar log !")
      })



    let dataAltera = new FormData()
    dataAltera.append("file", imageAltera)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID


    await axios.post('/files', dataAltera, configMultipart)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id


      }).catch(function (err) {

        console.log(err)

      });

  }




  await axios.post('/api/usuario',
  {
    "usuario": document.getElementById('usuarioAltera').value

  })

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
        if(!response.data.url == ''){
          document.getElementById('imageAltera').src = response.data.url
          sessionStorage.setItem('url', response.data.url)
          sessionStorage.setItem('urlID', response.data.urlID)
        }else{
          sessionStorage.setItem('url','')
          sessionStorage.setItem('urlID', '')
        }
      })
      .catch(function (erro) {
        console.log(erro)
      })

  } else {
    document.getElementById('formAltera').reset()
    document.getElementById('imageAltera').src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
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