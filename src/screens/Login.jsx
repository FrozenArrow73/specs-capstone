import React, {useContext, useState} from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const body = {
            username,
            password
        }

        setPassword("")
        setUsername("")

        if(authContext.register) {
            axios.post("http://localhost:4000/api/register", body).then((res) => {
                authContext.login(res.data.token, res.data.expiration, res.data.userId)``
            }).catch((err) => {
                console.log(err)
            })
        } else {
            axios.post("http://localhost:4000/api/login", body).then((res) => {
                authContext.login(res.data.token, res.data.expiration, res.data.userId)
                navigate("/")
            }).catch((err) => {
                console.log(err)
            }) 
        }
    }
  return (
    <form className='loginForm' onSubmit={handleSubmit}>
        <h2>{authContext.register?"Register":"Login"}</h2>
        <div className='loginDiv'>
            <label htmlFor="username" >Username</label>
            <input type="text" id='username' value={username} onChange={handleUsernameChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={handlePasswordChange}/>
        </div>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Login