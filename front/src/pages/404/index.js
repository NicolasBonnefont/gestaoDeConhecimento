import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound(){
 return(
   <>
   <h1>Página não encontrada</h1>
   <Link className="button" to="/principal">Voltar</Link> 
   </>
  )
}

