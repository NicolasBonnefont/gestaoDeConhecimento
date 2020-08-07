async function pesquisar() {
  event.preventDefault()

  location.href = '/pesquisa'
  sessionStorage.setItem('pesquisa', document.getElementById('pesquisa').value)

}

async function carregaPesquisa() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  document.getElementById('conteudo').innerHTML = '<h1 class="text-center">Carregando...</h1>'
  let lista = ''
  let url = sessionStorage.getItem('pesquisa')
  let pesquisa = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  await axios.post('/api/pesquisa',
    {
      "Pesquisa": pesquisa
    }, config)
    .then(function (response) {
      if (response.data.length > 0) {
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
        document.getElementById('conteudo').innerHTML = `<br><div class="text-center">
      <h3>Sem subtópico localizado...</h3>
      </div>`
      }
    })
}
carregaPesquisa() 