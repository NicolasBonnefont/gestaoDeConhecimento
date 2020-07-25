async function carregaPerfil(){
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  await axios.get('/api/logado', config)
    .then(function (response) {
      console.log(response.data)
      document.getElementById('imgPerfil').src = response.data.url
      document.getElementById('nomePerfil').innerHTML = response.data.Usuario
      document.getElementById('emailPerfil').innerHTML = response.data.Email

      //ALIMENTAR MODAL
      document.getElementById('imageAltera').src = response.data.url
      document.getElementById('usuarioAlera').value = response.data.Usuario
      document.getElementById('emailAltera').value = response.data.Email

      if (response.data.Administrador == 'N') {
        document.getElementById('cadastro').style.display = 'none'
      } else {
        document.getElementById('cadastro').style.display = 'block'
      }
    })
}
carregaPerfil()

