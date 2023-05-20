import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import PublicBookCard from '../components/PublicBookCard'

function PublicLibrary({personalBooks, setPersonalBooks, publicBooks, setPublicBooks}) {
    const authContext = useContext(AuthContext)
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/getPublicBooks/${authContext.userId}`, {headers: {authorization: authContext.token}}).then((res)=> {
            console.log(res.data)
            setPublicBooks(res.data)
            
        }).catch((err)=> {
            console.log(err)
        })
    }, [])

    const bookDisplay = publicBooks.map((book)=> {
        return <PublicBookCard key={book.id} bookId={book.id} title={book.title} imgUrl={book.img_url} language={book.language} setPublicBooks={setPublicBooks} setPersonalBooks={setPersonalBooks}/>
    })
  return (
    <div className='library'>{bookDisplay}</div>
  )
}

export default PublicLibrary