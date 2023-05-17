import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

let logoutTimer

const AuthContext = createContext({
    token: '',
    login: () => {},
    logout: () => {},
    userId: null,
    register: false

})

const calculateTimeRemaining = (expiration) => {
    const currentTime = new Date().getTime()
    const expirationTime = expiration 
    const remainingTime = expirationTime - currentTime
    
    return remainingTime
}

const getLocalData = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpiration = localStorage.getItem('expiration')
    const remainingTime = calculateTimeRemaining(storedExpiration)

    if (remainingTime <= 1000 * 60 * 30) {
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem("userId")
        return null
    }
    
    return {
        token: storedToken,
        duration: remainingTime,
    }

}

export const AuthContextProvider = (props) => {
    const localData = getLocalData()
  
    let initialToken = null
    if (localData) {
        initialToken = localData.token
    }

    const [token, setToken] = useState(initialToken)
    const [userId, setUserId] = useState(null)
    const [register, setRegister] = useState(false)
    
    
    const logout = () => {
        setToken(null)
        setUserId(null)


        localStorage.removeItem("token")
        localStorage.removeItem("expiration")
        localStorage.removeItem("userId")
    }
    
    const login = (token, expiration, userId) => {
        setToken(token)
        setUserId(userId)
        
        localStorage.setItem("token", token)
        localStorage.setItem("expiration", expiration)
        localStorage.setItem("userId", userId)

        const remainingTime = calculateTimeRemaining(expiration)
        logoutTimer = setTimeout(logout, remainingTime)
    }








    // const [isAuthorized, setIsAuthorized] = useState(true)
  
    // useEffect(()=>{
    //   axios.get("http://localhost:4000/authorization", {headers: {authorization: token}})
    //     .then((res)=> {
    //       console.log("setting isAuthorized to true")
    //       setIsAuthorized(true)
    //   }).catch((err)=> {
    //     console.log(err)
    //       setIsAuthorized(false)
    //       logout()
    //   })
    // },[token])







    const contextValue = {
        token,
        userId,
        register,
        login,
        logout,
        setRegister
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}
export default AuthContext