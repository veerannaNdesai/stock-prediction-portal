import React, { useState } from 'react'
import axios from 'axios'


const Register = () => {

  const [UserDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [Errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setUserDetails(
      prev => (
        {
          ...prev,
          [e.target.name]: e.target.value
        }
      )
    )

  }

  const handleRegistration = async (e) => {

    setLoading(true);
    e.preventDefault();
    const UserData = {
      ...UserDetails
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', UserData)
      console.log('response.data ==>', response.data)
      console.log('Registration susscessful.')
      setSuccess(true)
      setErrors({});
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
        console.error('Registration Error: ', error.response.data)
      } else {
        console.error("Error Occured :", error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-4 rounded ">
          <h1 className='text-center text-light mb-4 '>Create an Account</h1>
          <form onSubmit={handleRegistration}>
            <input type="text" className='form-control ' placeholder='username' name='username' value={UserDetails.username} onChange={handleChange} />
            <small>{Errors && <div className='text-danger mb-3'>{Errors.username}</div>}</small>
            <input type="email" className='form-control mb-3' placeholder='email' name='email' value={UserDetails.email} onChange={handleChange} />
            <input type="password" className='form-control' placeholder='set password' name='password' value={UserDetails.password} onChange={handleChange} />
            <small>{Errors && <div className='text-danger mb-3'>{Errors.password}</div>}</small>
            {success && <div className='alert alert-success' >Registration Successful!!!</div>}
            {
              loading ?
                <button type='submit' className='btn btn-info d-block mx-auto'>Loading...</button> :
                <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
            }

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register