import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/admin/Categories'

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
            <Route
    path="/admin/categories"
    element={<ProtectedRoute><Categories /></ProtectedRoute>}
/>
        </Routes>
      </>
    )
}

//<>...</>	Empty wrapper (React needs one parent).
//<Navbar />	Always visible on top.
//<Routes>	The list of pages.
//<Route path element>  If URL is this path, show this page.
///product/:id	:id is a changing part.
//<ProtectedRoute>	Only logged-in users.

