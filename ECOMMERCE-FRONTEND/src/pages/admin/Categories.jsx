import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../api/axios'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState('')          // add form
    const [editId, setEditId] = useState(null)    // kaunsi category edit ho rahi hai
    const [editName, setEditName] = useState('')  // edit input ki value

    // LIST
    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/cat/get-all')
            setCategories(data.categories || [])
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load categories')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    // CREATE
    const handleAdd = async (e) => {
        e.preventDefault()
        if (!name.trim()) return toast.error('Please enter category name')
        try {
            const { data } = await api.post('/cat/create', { category: name })
            toast.success(data.message)
            setName('')
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create category')
        }
    }

    // UPDATE
    const startEdit = (cat) => {
        setEditId(cat._id)
        setEditName(cat.category)
    }

    const cancelEdit = () => {
        setEditId(null)
        setEditName('')
    }

    const handleUpdate = async (id) => {
        if (!editName.trim()) return toast.error('Category name cannot be empty')
        try {
            const { data } = await api.put(`/cat/update/${id}`, { category: editName })
            toast.success(data.message)
            cancelEdit()
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update category')
        }
    }

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category?')) return
        try {
            const { data } = await api.delete(`/cat/delete/${id}`)
            toast.success(data.message)
            fetchCategories()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete category')
        }
    }

    if (loading) return <p style={{ padding: 20 }}>Loading...</p>

    return (
        <div style={{ maxWidth: 600, margin: '30px auto', padding: 20 }}>
            <h2>Manage Categories</h2>

            {/* ADD FORM */}
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: 10, margin: '15px 0' }}>
                <input
                    placeholder="New category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            {categories.length === 0 && <p>No category found</p>}

            {/* LIST */}
            {categories.map((cat) => (
                <div
                    key={cat._id}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderBottom: '1px solid #ddd' }}
                >
                    {editId === cat._id ? (
                        <>
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                            <button onClick={() => handleUpdate(cat._id)}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <span style={{ flex: 1 }}>{cat.category}</span>
                            <button onClick={() => startEdit(cat)}>Edit</button>
                            <button onClick={() => handleDelete(cat._id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}