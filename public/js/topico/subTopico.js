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
      document.getElementById('form').reset()
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
  document.getElementById('conteudo').innerHTML = '<h1>Carregando...</h1>'
  let lista = ''
  await axios.get('/api/subtopico/' + location.href.split("=").pop(), config)
    .then(function (response) {
      if (response.data.length > 0) {
        console.log(response.data)
        response.data.map(topico =>
          lista += `<div class="card cardCustom cardSubTopico">
          <div class="badgeTopico"><span class=" badge badge-${topico.Status === 'P' ? 'danger' : 'success'}">${topico.Status}</span></div>
           <div onclick="location.href='/detalhe?id=${topico.id}'" class="row">
           <h4 class="col">${topico.Titulo} </h4>
           <p class="col card-text"><small class="text-muted">Ultima atualização: ${topico.updated_at}</small></p>
           <p class="col card-text"><small class="text-muted">Alterado por: ${topico.UsuarioAlteracao ? topico.UsuarioAlteracao : topico.Usuario}</small>
           </p></div> </div>`
        )
        document.getElementById('conteudo').innerHTML = lista
      } else {
        document.getElementById('conteudo').innerHTML = `<br><div class="">
        <h3>Sem subtópico criado...</h3>
        </div>`
      }

    })
    .catch(function (err) {
      console.log(err)
      alert('Erro ao litsar ! Verificar LOG !')
    })
}
async function nomeTopico() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  await axios.get('/api/topico/' + location.href.split("=").pop(), config)
    .then(function (response) {
      document.getElementById('nomeTopico').innerHTML = response.data.Titulo
    })
}

nomeTopico()
listarSubTopicos()
//

