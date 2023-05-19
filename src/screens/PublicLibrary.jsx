import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

function PublicLibrary() {
    const [publicBooks, setPublicBooks] = useState([])
    const authContext = useContext(AuthContext)
    console.log(authContext.userId)
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/getPublicBooks/${authContext.userId}`).then((res)=> {
            console.log(res.data)
        }).catch((err)=> {
            console.log(err)
        })
    }, [publicBooks])
  return (
    <div>PublicLibrary</div>
  )
}

export default PublicLibrary