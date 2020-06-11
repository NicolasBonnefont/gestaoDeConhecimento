
import React from 'react'
import {BrowserRouter,Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Principal from './pages/Principal'
import NotFound from './NotFound'
import PrivateRoute from './auth'


export default function Routes(){

  return(
    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={Login}/>         
      <PrivateRoute path="/Principal" exact component={Principal}/>


      <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
  )
}