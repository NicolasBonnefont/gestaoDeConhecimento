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
        conteudo += `
        <div style="background-image: url('${topico.Url}');"onclick="location.href='/subTopicos?id=${topico.id}'"" class="card cardcustom">
        <div class="card cardTituloTopico"> <h4>${topico.Titulo}</h4></div></div>`)


      document.getElementById('conteudo').innerHTML = conteudo
    })

}
listarTopicos()

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
        document.getElementById('fieldsetAlteracao').disabled = false
        document.getElementById('tituloAlteracao').value = response.data.Titulo
        document.getElementById('descricaoAlteracao').value = response.data.Descricao
        document.getElementById('urlAlteracao').value = response.data.Url
      })
  }

}
async function alterarTopico() {
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.put('/api/topico/' + document.getElementById('topicoSelect').value,
    {
      Titulo: document.getElementById('tituloAlteracao').value,
      Descricao: document.getElementById('descricaoAlteracao').value,
      Url: document.getElementById('urlAlteracao').value
    }, config)
    .then(function (response) {
      alert('Tópico alterado com sucesso ! ')
      carregarTopico()
      inicializa()
    })
    .catch(function (erro) {
      console.log(erro)
      console.log('Erro ao alterar tópico ! Verificar log')
      carregarTopico()
      inicializa()
    })

}
async function exlcuirTopico() {
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

    let existe=[]
    await axios.get('/api/subtopico/' + document.getElementById('topicoSelect').value, config)
    .then(function(response){
      existe = response.data
    })

    if(!existe.length){
      await axios.delete('/api/topico/' + document.getElementById('topicoSelect').value, config)
      .then(function (response) {
        alert('Tópico excluido com sucesso !')
        inicializa()
        carregarTopico()


      })
      .catch(function (erro) {
        console.log(erro)
        alert('Poblema ao tentar excluir o topico ! Verificar LOG')
        inicializa()
        carregarTopico()

      })
    }else{
      alert('Existe subtópico criado para este tópico ! Exclusão nao permitida.')
    }





}
function inicializa() {
  listarTopicos()
  document.getElementById('tituloAlteracao').value = ''
  document.getElementById('descricaoAlteracao').value = ''
  document.getElementById('fieldsetAlteracao').disabled = true
  document.getElementById('urlAlteracao').value = ''
}
async function cadastrarTopico(){
  event.preventDefault()
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.post('/api/topico',
  {
    "Titulo": document.getElementById('titulo').value,
    "Descricao": document.getElementById('descricao').value,
    "Url": document.getElementById('url').value

  }, config)
  .then(function(response){
    alert('Topico cadastrado com sucesso ! ')
    document.getElementById('form').reset()
  })
}