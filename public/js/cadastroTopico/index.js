async function cadastrarTopico(){
  event.preventDefault()
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('sessao')}` },
  };

  await axios.post('/api/topico',
  {
    "Titulo": document.getElementById('titulo').value,
    "Descricao": document.getElementById('descricao').value

  }, config)
  .then(function(response){
    alert('Topico cadastrado com sucesso ! ')
    document.getElementById('form').reset()
  })
}