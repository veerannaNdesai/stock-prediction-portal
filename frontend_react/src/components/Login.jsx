import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from './AuthProvider'


const Login = () => {

    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    const Navigate = useNavigate();
    const {isLoggedIn,setLoggedin} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);
        // console.log(userDetails);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userDetails)
            // console.log('response.data==>', response.data)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh);
            setErrors('');
            setLoggedin(true);
            Navigate('/');
            // console.log('Login succesful')
        } catch (error) {
                // console.error('Error Occured: ', error.response.data)
                setErrors('Invalid Credentials');
            
        } finally {
            setLoading(false);
           
        }
    }
    const handleChange = (e) => {
        setUserDetails(
            prev => (
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        )
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-md-6 bg-light-dark p-3">
                        <h1 className='text-light text-center mb-4' >Login to Portal</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder='username' className='form-control mb-3' value={userDetails.username} onChange={handleChange} />
                            <input type="password" name="password" placeholder='password' className='form-control mb-3' value={userDetails.password} onChange={handleChange} />
                            {errors && <div className='text-danger mb-3'>{errors}</div>}
                            <button type='submit' className='btn btn-info d-block mx-auto'>
                                {loading ? 'logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login