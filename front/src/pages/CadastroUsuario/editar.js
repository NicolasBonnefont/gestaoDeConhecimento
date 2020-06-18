import React, { useState, useEffect } from 'react';
import Nav from '../navbar'
import './styles.css';
import api from '../../services/api';
import Menu from './menu'


// import { Container } from './styles';

function EditarUsuario() {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    api.get('usuario',{
    }).then(response =>{
      setUsuarios(response.data)
    })
  }, [])


  return (
    <>
      <Nav />

      <div className="container">

        <Menu />

        <div className="cardCustom">

          <form className="formCustom">

            <span>Selecione o usuário para alterar:</span>

            <select name="" id="">
              <option value="">...</option>
              {usuarios.map(usuario =>(
                 <option value={usuario.id}>{usuario.usuario}</option>
              ))}
            </select>

          </form>

        </div>
      </div>




    </>
  );
}

export default EditarUsuario;