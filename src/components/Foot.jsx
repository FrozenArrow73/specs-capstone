import React, {useContext} from 'react'
import AuthContext from '../store/authContext'
import { useNavigate } from 'react-router-dom'

function Foot({isAuthorized}) {
    const navigate = useNavigate()
    const {register, setRegister, logout} = useContext(AuthContext)
    const handleRegister = () => {
        setRegister((currentValue) => {
            return!currentValue
        })
    }
    const handleAll = () => {
        navigate("/")
    }
    const handleMistakes = () => {
        navigate("/mistakes")
    }
    const handlePersonal = () => {
        navigate("/personal")
    }
    const handlePublic = () => {
        navigate("/public")
    }
  return (
    <footer>
        {!isAuthorized && <button onClick={handleRegister}>{register?"Login":"Register"}</button>}
        {isAuthorized && <button onClick={handleAll}>Practice all</button>}
        {isAuthorized && <button onClick={handleMistakes}>Practice mistakes</button>}
        {isAuthorized && <button onClick={handlePersonal}>Personal library</button>}
        {isAuthorized && <button onClick={handlePublic}>Public library</button>}
        {isAuthorized && <button onClick={logout}>Logout</button>}
    </footer>
  )
}

export default Foot