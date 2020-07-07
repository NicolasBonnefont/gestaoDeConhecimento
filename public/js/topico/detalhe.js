async function carregaDetalhe() {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };
  await axios.get('api/subtopico/detalhe/' + location.href.split("=").pop(), config)
    .then(function (response) {
      document.getElementById('titulo').value = response.data.Titulo
      document.getElementById('descricao').value = response.data.Descricao
    })
}
carregaDetalhe()
async function alteraSubTopico() {
  event.preventDefault()

  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.put('/api/subtopico/' + location.href.split("=").pop(),
    {
      Titulo: document.getElementById('titulo').value,
      Descricao: document.getElementById('descricao').value
    }, config)
    .then(function (response) {
      alert('Alteração salva com sucesso !')
      history.back()
    })
    .catch(function (erro) {
      console.log(erro)
      alert('Problema ao gravar as alterações ! Verificar LOG.')
    })
}