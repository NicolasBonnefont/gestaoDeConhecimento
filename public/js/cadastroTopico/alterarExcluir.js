async function carregarTopico() {
  inicializa()
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  let options = '<option value="0">...</option>'
  await axios.get('/api/topico', config)
    .then(function (response) {
      response.data.map(topico =>
        options += `<option value="${topico.id}">${topico.Titulo}</option>`
      )
      document.getElementById('topicoSelect').innerHTML = options
    })
}

carregarTopico()

async function igualaTopico() {
  inicializa()
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  if (document.getElementById('topicoSelect').value > 0) {
    await axios.get('/api/topico/' + document.getElementById('topicoSelect').value, config)
      .then(function (response) {
        document.getElementById('fieldset').disabled = false
        document.getElementById('titulo').value = response.data.Titulo
        document.getElementById('descricao').value = response.data.Descricao
      })
  }

}
async function alterarTopico(){
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.put('/api/topico/' + document.getElementById('topicoSelect').value,
  {
    Titulo: document.getElementById('titulo').value,
    Descricao: document.getElementById('descricao').value
  }, config)
  .then(function(response){
    alert('Tópico alterado com sucesso ! ')
    carregarTopico()
    inicializa()
  })
  .cacth(function(erro){
    console.log('Erro ao alterar tópico ! Verificar log')
    carregarTopico()
    inicializa()
  })

}
async function exlcuirTopico(){
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  let confirma = confirm('Deseja mesmo exlcuir este Tópico ? ')
  if(confirma == true){
    await axios.delete('/api/topico/' + document.getElementById('topicoSelect').value, config)
    .then(function(response){
      alert('Tópico excluido com sucesso !')
      inicializa()
      carregarTopico()

    })
    .catch(function(erro){
      console.log(erro)
      alert('Poblema ao tentar excluir o topico ! Verificar LOG')
      inicializa()
      carregarTopico()
    })
  }


}
function inicializa(){
  document.getElementById('titulo').value = ''
  document.getElementById('descricao').value = ''
  document.getElementById('fieldset').disabled = true
}