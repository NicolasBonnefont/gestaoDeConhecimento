import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function NotFound(){
  const history = useHistory()

  function voltar() {
    history.goBack()
    
  }
 return(
   <>
   <h1>Página não encontrada</h1>
   <Link className="button" onClick={()=>voltar()}>Voltar</Link> 
   </>
  )
}

