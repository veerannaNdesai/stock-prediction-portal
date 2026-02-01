import React, { useContext } from 'react'
import { AuthContext } from './components/AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRouter = ({children}) => {
    const { isLoggedIn } = useContext(AuthContext);
  return (
        !isLoggedIn ? 
        children :
        (<Navigate to={'/'}/>)
  )
}

export default PublicRouter