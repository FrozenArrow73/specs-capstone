import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

function PracticeAll() {
  const authContext = useContext(AuthContext)
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/getRandomSentence/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res)=>{
      console.log(res.data)
    })
  }, [])
  return (
    <div>PracticeAll</div>
  )
}

export default PracticeAll