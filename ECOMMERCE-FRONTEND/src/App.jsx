import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from './pages/ProductDetails'

export default function App() {
    return (
      <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/profile"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </>
    )
}

