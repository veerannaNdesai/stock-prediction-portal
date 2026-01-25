import React, { useContext } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import { useNavigate } from 'react-router-dom'


const Header = () => {

  const Navigate = useNavigate();
  const { isLoggedIn, setLoggedin } = useContext(AuthContext)

  const handleLogout = () =>{
      
      Navigate('/login');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLoggedin(false);
  }


  return (

    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
      
        <Link to={'/'} className="navbar-brand text-light">stock predictor app</Link>
        <div>
          {
            isLoggedIn ?
              <>
                <Button text="Dashboard" class="btn-outline-info" />
                &nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger ' onClick={handleLogout} >Logout</button>
              </>
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