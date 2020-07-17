function verificaAcesso() {

  if (!sessionStorage.getItem('sessao')) {
    window.location.replace("..");
  }

  // Add a 401 response interceptor
  axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
    console.log('aki')
    if (401 === error.response.status) {
      alert(' Sessão inválida ! Realizar Login Novamente.')
      deslogar()
    } else {
      return Promise.reject(error);
    }
  });
}

function deslogar() {
  sessionStorage.clear()
  localStorage.clear()
  window.location.replace("..");
}
verificaAcesso()

async function imgPerfil() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  await axios.get('/api/logado',config)
  .then(function(response){
    document.getElementById('imgLogin').src = response.data.url
    document.getElementById('imgLogin').alt = response.data.usuario
    console.log(response.data.Administrador)
    if(response.data.Administrador == 'N'){
      document.getElementById('cadastro').style.display = 'none'
    }else{
      document.getElementById('cadastro').style.display = 'block'
    }
  })

}
imgPerfil()

