import React from 'react';
import { useHistory, Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import './styles.css';


function Menu() {

  const history = useHistory()

  return (
    <div className="cardCustom menu">
      <ul>
        <li>
          <Link onClick={() => history.push('/CadastroUsuario')}> <Icon>account_box</Icon> Cadasto Usuario</Link>
        </li>
        <li>
          <Link onClick={() => history.push('/EditarUsuario')}><Icon>create</Icon> Editar Usuario</Link>
        </li>
        <li>
          <Link onClick={() => history.push('/ListarUsuario')}><Icon>list_alt</Icon> Listar Usuários</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;