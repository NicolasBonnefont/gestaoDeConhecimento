import React from 'react'

import {Route, Redirect } from 'react-router'

const PrivateRoute = props => {
  const logado = !!sessionStorage.getItem('logado')
  return logado ? <Route {...props}/> : <Redirect to="/login"/>
}

export default PrivateRoute