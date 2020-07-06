async function gravarSubTopico() {
  event.preventDefault()
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.post('/api/subTopico',
    {
      "id_topico": location.href.split("=").pop(),
      "Titulo": document.getElementById('titulo').value,
      "Descricao": document.getElementById('descricao').value
    }, config)
    .then(function (response) {
      alert('Registrado com sucesso !')
    })
    .catch(function (err) {
      console.log(err)
      alert('Problema no registro! Verificar LOG')
    })
}
async function listarSubTopicos() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  let lista = ''
  await axios.get('/api/subtopico/' + location.href.split("=").pop(), config)
    .then(function (response) {
      response.data.map(topico =>
        lista += `<div class="card"> <h4>${topico.Titulo} </h4> </div>`
      )
      document.getElementById('conteudo').innerHTML = lista
    })
    .catch(function (err) {
      console.log(err)
      alert('Erro ao litsar ! Verificar LOG !')
    })
}
listarSubTopicos()
