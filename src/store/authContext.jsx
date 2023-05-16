import React, {createContext, useState} from "react";

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

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)
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