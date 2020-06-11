import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Fundo from '../../assets/empresa/mor/logo.png'
import api from '../../services/api'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import './login.css'
export default function Login() {

  const [senha, setSenha] = useState('')
  const [usuario, setUsuario] = useState('')

  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    console.log(senha, usuario)

    try {
      await api.post('login',
        {
          "usuario": usuario,
          "senha": senha
        })

      alert('Logado com sucesso !')
      //   history.push('/profile')


    } catch (err) {
      console.log(err)
      alert("Falha no Login ! Verificar log", err)
    }

  }

  return (
    <div className="logon-container">
      <Card>
      <section className="form">
        <img className="imgLogin" src={Fundo} alt="MOR INFO" />

        <form onSubmit={handleLogin}>

        <Box className="textCenter" fontWeight="fontWeightLight" fontSize={25}>Faça seu Logon</Box>
        <br/>
          <TextField 
          id="outlined-basic" 
          className="inputLogin" 
          label="Login" 
          variant="outlined"
          value={usuario} 
          onChange={e => setUsuario(e.target.value)} 
          /> 

          <br/>
          <br/>

          <TextField 
          id="outlined-basic"
          className="inputLogin" 
          label="Senha" 
          variant="outlined"
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          /> 

          <br/>
          <br/>

        <Button className="btnLogar" type="submit" variant="contained" color="primary"> Logar</Button>
        </form>
      </section>
      </Card>
    </div>
  )
}