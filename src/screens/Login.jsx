import React from 'react'

function Login() {
  return (
    <form className='loginForm'>
        <h2>Login</h2>
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