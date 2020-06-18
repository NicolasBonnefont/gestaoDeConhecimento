
import React from 'react'
import {BrowserRouter,Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Principal from './pages/Principal'
import NotFound from './pages/404'
import CadastroUsuario from './pages/CadastroUsuario'
import EditarUsuario from './pages/CadastroUsuario/editar'
import PrivateRoute from './auth'


export default function Routes(){

  return(
    <BrowserRouter>
    <Switch>
    <Route path="/login" exact component={Login}/>         
      <PrivateRoute path="/" exact component={Principal}/>
      <PrivateRoute path="/CadastroUsuario" exact component={CadastroUsuario}/>
      <PrivateRoute path="/EditarUsuario" exact component={EditarUsuario}/>


      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
  )
}