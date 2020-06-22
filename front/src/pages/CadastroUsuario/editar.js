import React, { useState, useEffect } from 'react';
import Nav from '../navbar'
import './styles.css';
import api from '../../services/api';
import Menu from './menu'

function EditarUsuario() {

  const [usuarios, setUsuarios] = useState([])
  let idAltera = ''

  useEffect(() => {
    api.get('usuario', {
    }).then(response => {
      setUsuarios(response.data)
    })
  }, [])

  function iguala(id) {

    if (id > 0) {
      const teste = usuarios.filter(usuario => usuario.id == id)

      if (teste) {
        document.getElementById('usuarioAltera').value = teste[0].usuario
        idAltera = teste[0].id
      } else {
        document.getElementById('usuarioAltera').value = ''
      }
    } else {
      document.getElementById('usuarioAltera').value = ''
    }

  }

  async function alteraUsuario(e) {
    e.preventDefault()

    await api.put(`/usuario/${idAltera}`,
      {
        usuario: document.getElementById('usuarioAltera').value
      })

    window.location.reload()

  }

  return (
    <>

      <Nav />

      <div className="container">

        <Menu />

        <div className="cardCustom">

          <form id='form' className="formCustom" onSubmit={alteraUsuario}>

            <span>Selecione o usuário para alterar:</span>

            <select onChange={(e) => iguala(e.target.value)}>
              <option value="">...</option>
              {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>{usuario.usuario}</option>
              ))}
            </select>

            <br />
            <input id='usuarioAltera' type="text" />

            <br />

            <button>Alterar</button>


          </form>

        </div>
      </div>

    </>
  );
}

export default EditarUsuario;