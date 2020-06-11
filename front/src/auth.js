import React from 'react'

import {Route, Redirect } from 'react-router'

const PrivateRoute = props => {
  const logado = !!localStorage.getItem('logado')
  return logado ? <Route {...props}/> : <Redirect to="/"/>
}

export default PrivateRoute