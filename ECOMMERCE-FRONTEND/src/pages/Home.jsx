import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/product/get-all')
                setProducts(data.products || [])
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load products')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h2>All Products</h2>

            {products.length === 0 && <p>No products found</p>}

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {products.map((p) => (
                    <div key={p._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                        <img
                            src={p.images?.[0]?.url}
                            alt={p.name}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <h3>
    <Link to={`/product/${p._id}`}>{p.name}</Link>
</h3>
                        <p>{p.description}</p>
                        <p>₹{p.price}</p>
                        <p>Stock: {p.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

//useState([])	Start with an empty list
//useEffect(..., [])	Run once when the page opens.
//api.get(...)	Ask the server for all products.
//data.products || []	Use [] if nothing came.
//products.map((p) => ...)	Make one card for each product.	
//key={p._id}	A unique id so React tracks each card.
//p.images?.[0]?.url	First image URL, safely.
//<Link to={/product/${p._id}}>	Open that product’s detail page.