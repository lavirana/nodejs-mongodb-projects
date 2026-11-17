import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    return user ? children : <Navigate to="/login" />
}

//{ children }	The page we want to protect.
//const { user } = useAuth()	Check who is logged in.
//user ? children : <Navigate .../>	If logged in show the page, else go to login.