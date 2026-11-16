import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
            <Link to="/"><b>ECOMMERCE APP</b></Link>
            <Link to="/">Home</Link>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 15, alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link to="/profile">Hi, {user.name}</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}