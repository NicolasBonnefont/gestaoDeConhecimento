import React, { useState, useEffect } from 'react';
import Nav from '../navbar'
import './styles.css';
import api from '../../services/api';
import Menu from './menu'

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    api.get('usuario', {
    }).then(response => {
      setUsuarios(response.data)
    })
  }, [])

  return (
    <>

      <Nav />

      <div className="container">

        <Menu />

        <div className="cardCustom">

            <table>
              <tr>
                <th>
                  id
                </th>
                <th>
                  Usuario
                 </th>
              </tr>

              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>
                    {usuario.id}
                  </td>
                  <td>
                    {usuario.usuario}
                  </td>
                </tr>
              ))}



            </table>
        </div>
      </div>

    </>

  );
}

export default ListarUsuario;