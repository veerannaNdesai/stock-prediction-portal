import React from 'react'
import Button from './Button'

const Header = () => {
  return (
    <>
        <nav className="navbar container pt-3 pb-3 align-items-start">
            <a href="" className="navbar-brand text-light">stock predictor app</a>
            <div>
                <Button text="Login" class="btn-outline-info" />
                &nbsp;&nbsp;&nbsp;
                <Button text="Register" class="btn-info" />
            </div>
        </nav>
    </>
  )
}

export default Header