async function carregaDetalhe() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  let idTopico = 0
  await axios.get('api/subtopico/detalhe/' + location.href.split("=").pop(), config)
    .then(function (response) {
      idTopico = response.data.id_topico
      document.getElementById('titulo').value = response.data.Titulo
      document.getElementById('descricao').value = response.data.Descricao
      console.log(response.data.Status)
      response.data.Status === 'F' ? document.getElementById('checkbox').checked = true : document.getElementById('checkbox').checked = false
    })

  await axios.get('/api/topico/' + idTopico, config)
    .then(function (response) {
      document.getElementById('nomeTopico').innerHTML = response.data.Titulo
    })
    .catch(function (erro) {
      console.log(erro)
    })
}
carregaDetalhe()
async function alteraSubTopico() {
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  let finalizado =''
  if(document.getElementById('checkbox').checked){
    finalizado = 'F'
  }else{
    finalizado = 'P'
  }
  let idTopico = 0
  console.log(finalizado)
  await axios.put('/api/subtopico/' + location.href.split("=").pop(),
    {
      Titulo: document.getElementById('titulo').value,
      Descricao: document.getElementById('descricao').value,
      Status: finalizado
    }, config)
    .then(function (response) {
      idTopico = response.data.id_topico
      alert('Alteração salva com sucesso !')
      window.location=document.referrer
    })
    .catch(function (erro) {
      console.log(erro)
      alert('Problema ao gravar as alterações ! Verificar LOG.')
    })


}


