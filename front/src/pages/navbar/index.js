import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom'
import './style.css'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCadastroUsuario = () => {
    setAnchorEl(null);
    history.push('/CadastroUsuario')
  };
  const handleClickPrincipal = () => {
    setAnchorEl(null);
    history.push('/')
  }
  const handleCadastroTopicos = () => {
    setAnchorEl(null);
    history.push('/CadastroTopico')
  }

  return (
    <nav className="nav ">
      <div className="containerGlobal">
        <ul >
          <li className="empresa">
            <a href onClick={handleClickPrincipal}>
              MOR INFO
      </a>
          </li>
          <li className="menu">
            <a href aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Icon>business</Icon>  Cadastro
      </a>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCadastroUsuario}>Cadastro Usuário</MenuItem>
              <MenuItem onClick={handleCadastroTopicos}>Cadastro Tópico</MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
    </nav>);
}
