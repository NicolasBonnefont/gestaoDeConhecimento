async function listarTopicos() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  let topicos
  var conteudo = ''

  await axios.get('/api/topico', config)

    .then(function (response) {
      topicos = response.data
      topicos.map(topico =>
        conteudo += `<div class="card cardcustom"><h4>${topico.Titulo}</h4></div>`)


      document.getElementById('conteudo').innerHTML = conteudo
    })

}
listarTopicos()