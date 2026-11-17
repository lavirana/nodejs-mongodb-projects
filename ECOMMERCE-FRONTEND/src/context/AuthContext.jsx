//a shared box of data that any page can read.
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()  //Create the shared box.

//AuthProvider - A wrapper component that holds the data.
//{ children }	Everything wrapped inside it.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null //Start with saved user, else null.
    )

    //login(token, userData)  - Save token and user.
    //localStorage.setItem	Save in the browser.
    //setUser(userData)	Update the screen.
    const login = (token, userData) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        //Share user, login, logout with all pages.
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)