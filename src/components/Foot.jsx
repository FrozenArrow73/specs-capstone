import React, {useContext} from 'react'
import AuthContext from '../store/authContext'

function Foot() {
    const {register, setRegister} = useContext(AuthContext)

    const handleClick = () => {
        setRegister((currentValue) => {
            return!currentValue
        })
    }
  return (
    <footer>
        <button onClick={handleClick}>{register?"Login":"Register"}</button>
    </footer>
  )
}

export default Foot