


function verificaAcesso() {

  if(!sessionStorage.getItem('sessao')){
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

