import React, { useState } from 'react';
import Nav from '../navbar'
import './styles.css';
import api from '../../services/api';
import Menu from './menu'

// parte do cadastro do usuário
function CadastroUsuario() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  function limpar() {
    document.getElementById('usuario').focus()
    setUsuario('')
    setSenha('')
  }
  async function handleCadastrar(e) {
    e.preventDefault()
    const data = { usuario, senha }

    if (usuario.length > 0 && senha.length > 0) {
      try {
        await api.post('/usuario', data)
        alert('Usuário cadastrado com sucesso ')
        limpar()

      } catch (response) {
        alert('Problema ao cadastrar ! Verificar log.')
        console.log(response)
        limpar()
      }
    } else {

    }

  }
  return (
    <>
      <Nav />

      <div className="container">

        <Menu />

        <div className="cardCustom">
          <h1>Cadasto de Usuário</h1>
          <form id='form' className="formCustom" onSubmit={handleCadastrar}>
            <span>Usuário :</span>
            <input id="usuario" value={usuario} onChange={e => setUsuario(e.target.value)}
              className="inputCustom" type="text" required />
            <span>Senha :</span>
            <input value={senha} onChange={e => setSenha(e.target.value)}
              className="inputCustom" type="text" required />
            <button type='submit' className="btnCustom">Salvar Usuário</button>
          </form>
        </div>
      </div>

    </>
  );
}
export default CadastroUsuario;