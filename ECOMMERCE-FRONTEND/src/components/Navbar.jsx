import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
    const { user, logout } = useAuth()  //useAuth()	Get user and logout from the box.
    const navigate = useNavigate() //useNavigate()	A function to change page by code.

    //handleLogout	Clear login, then go to login page.
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    //<Link to="/">	A link that does not reload the page.
    //user ? (...) : (...)	If logged in show name and Logout, else Login and Register.
    return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '10px 20px', borderBottom: '1px solid #ddd' }}>
            <Link to="/"><b>ECOMMERCE APP</b></Link>
            <Link to="/">Home</Link>
            <Link to="/admin/categories">Categories</Link>

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