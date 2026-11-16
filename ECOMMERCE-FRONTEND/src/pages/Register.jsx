import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        city: '',
        country: '',
        phone: '',
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // ek hi function se saare inputs handle honge
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await api.post('/user/register', form)
            toast.success(data.message)
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 320, margin: '40px auto', display: 'grid', gap: 10 }}
        >
            <h2>Register</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password (min 6)" value={form.password} onChange={handleChange} minLength={6} required />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}