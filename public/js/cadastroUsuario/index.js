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
      urlID = response.data.id
      console.log(response.data)
    })
  console.log(urlID)
  await axios.post('/api/usuario',

    {
      "usuario": document.getElementById('usuario').value,
      "senha": document.getElementById('senha').value,
      "email": document.getElementById('email').value,
      'url': url,
      'urlID': urlID
    }, config)
    .then(function (response) {
      alert('Usuario Cadastrado com sucesso ! ')
      document.getElementById('formCadastro').reset()
      document.getElementById('imageNovo').src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
      //ocation.reload()
    })
    .catch(function (erro) {
      console.log(erro)
      alert('Problema ao cadastrar Usuário !')
      document.getElementById('formCadastro').reset()
    })
}

async function alterarUsuario() {
  event.preventDefault()
  var urlID = sessionStorage.getItem('urlID')
  const imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = ''

  let data = new FormData()
  data.append("file", imgAltera)

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
    'Content-Type': 'multipart/form-data'
  };


  if (!imgAltera == '') {
    if (!urlID == null) {
      await axios.delete("/files/" + urlID, config)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error)
          return alert("Houve um problema, verificar log !")
        })

    }

    await axios.post('/files', data, config)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id


      }).catch(function (err) {

        console.log(err)

      });

  }

  await axios.put('/api/usuario/' + document.getElementById('usuariosSelect').value,
    {
      "usuario": document.getElementById('usuarioAltera').value,
      "email": document.getElementById('emailAltera').value,
      'url': urlAltera,
      'urlID': urlID

    }, config)
    .then(function (response) {
      alert('Usuario alterado com sucesso ! ')
      document.getElementById('fieldsetAltera').disabled = true
      document.getElementById('formAltera').reset()
      document.getElementById('imageAltera').src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
    })
    .catch(function (erro) {
      console.log(erro)
      alert('Problema na alteração do usuário, verificar log')
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
        document.getElementById('fieldsetAltera').disabled = false
        document.getElementById('usuarioAltera').value = response.data.Usuario
        document.getElementById('emailAltera').value = response.data.Email
        if (!response.data.url == '') {
          document.getElementById('imageAltera').src = response.data.url
          sessionStorage.setItem('url', response.data.url)
          sessionStorage.setItem('urlID', response.data.urlID)
        } else {
          sessionStorage.setItem('url', '')
          sessionStorage.setItem('urlID', '')
          document.getElementById('imageAltera').src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
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
async function excluirUsuario() {
  event.preventDefault()
  var urlID = sessionStorage.getItem('urlID')
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  async function deletar() {
    await axios.delete('/api/usuario/' + document.getElementById('usuariosSelect').value, config)
      .then(function (response) {
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'Usuario excluido com sucesso !',
          showConfirmButton: false,
          timer: 1500

        }).then((result) => {

          if (result.dismiss === Swal.DismissReason.timer) {
            document.getElementById('fieldsetAltera').disabled = true
            document.getElementById('formAltera').reset()
            document.getElementById('imageAltera').src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
            carregaUsuario()
          }
        })

      })
      .catch(function (error) {

      })
    await axios.delete('/files/' + urlID, config)
  }
  Swal.fire({
    title: 'Excluir?',
    text: "Você tem certeza que deseja excluir este usuário ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, exlcuir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      deletar()
    }
  })

}
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
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgAltera = document.getElementById("imageAltera")
      imgAltera.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}