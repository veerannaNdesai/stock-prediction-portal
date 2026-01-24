import React, { useContext } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const Header = () => {

  const { isLoggedIn, setLoggedin } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link to={'/'} className="navbar-brand text-light">stock predictor app</Link>
        <div>
          {
            isLoggedIn ? 
                <h3>Login</h3>
                  :
              <>
                <Button text="Login" class="btn-outline-info" />
                &nbsp;&nbsp;&nbsp;
                <Button text="Register" class="btn-info" />
              </>
          }
        </div>
      </nav>
    </>
  )
}

export default Header