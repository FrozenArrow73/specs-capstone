import React, {useContext} from 'react'
import AuthContext from '../store/authContext'

function Foot() {
    const {register, setRegister, logout} = useContext(AuthContext)

    const handleRegister = () => {
        setRegister((currentValue) => {
            return!currentValue
        })
    }
  return (
    <footer>
        <button onClick={handleRegister}>{register?"Login":"Register"}</button>
        <button onClick={logout}>Logout</button>
    </footer>
  )
}

export default Foot