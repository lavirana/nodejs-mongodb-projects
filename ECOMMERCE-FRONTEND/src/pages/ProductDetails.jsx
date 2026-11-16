import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'

export default function ProductDetails() {
    const { id } = useParams()          // URL se id milti hai
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/product/${id}`)
                setProduct(data.product)
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load product')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <p style={{ padding: 20 }}>Loading...</p>
    if (!product) return <p style={{ padding: 20 }}>Product not found</p>

    return (
        <div style={{ maxWidth: 700, margin: '30px auto', padding: 20 }}>
            <button onClick={() => navigate(-1)}>← Back</button>

            <div style={{ display: 'flex', gap: 30, marginTop: 20, flexWrap: 'wrap' }}>
                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    style={{ width: 300, height: 300, objectFit: 'cover' }}
                />
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>₹{product.price}</h3>
                    <p>
                        {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
                    </p>
                    <button disabled={product.stock <= 0}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}