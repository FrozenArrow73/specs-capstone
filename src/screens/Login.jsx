import React, {useContext} from 'react'
import AuthContext from '../store/authContext'

function Login() {
    const authContext = useContext(AuthContext)
  return (
    <form className='loginForm'>
        <h2>{authContext.register?"Register":"Login"}</h2>
        <div className='loginDiv'>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' />
            <label htmlFor="password">Password</label>
            <input type="password" id='password' />
        </div>
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login