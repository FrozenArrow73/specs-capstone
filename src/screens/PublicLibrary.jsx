import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import PublicBookCard from '../components/PublicBookCard'

function PublicLibrary() {
    const [publicBooks, setPublicBooks] = useState([])
    const authContext = useContext(AuthContext)
    console.log(authContext.userId)
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/getPublicBooks/${authContext.userId}`).then((res)=> {
            setPublicBooks(res.data)
            
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const bookDisplay = publicBooks.map((book)=> {
        return <PublicBookCard title={book.title} imgUrl={book.img_url} language={book.language}/>
    })
  return (
    <div>{bookDisplay}</div>
  )
}

export default PublicLibrary