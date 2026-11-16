import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'

export default function Profile() {
    const [profile, setProfile] = useState(null)
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/user/profile')
            setProfile(data.user)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load profile')
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!image) return toast.error('Please select an image')

        const formData = new FormData()
        formData.append('profilePic', image)   // backend ke upload.single() ka naam

        setUploading(true)
        try {
            const { data } = await api.put('/user/upload-profile-picture', formData)
            toast.success(data.message)
            setImage(null)
            fetchProfile()                      // nayi photo dikhane ke liye dobara load
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    if (!profile) return <p style={{ padding: 20 }}>Loading...</p>

    return (
        <div style={{ maxWidth: 500, margin: '30px auto', padding: 20 }}>
            <h2>My Profile</h2>

            {profile.profilePic?.url ? (
                <img
                    src={profile.profilePic.url}
                    alt="profile"
                    style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
                />
            ) : (
                <p>No profile picture</p>
            )}

            <form onSubmit={handleUpload} style={{ margin: '15px 0' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                </button>
            </form>

            <p><b>Name:</b> {profile.name}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>Address:</b> {profile.address}, {profile.city}, {profile.country}</p>
        </div>
    )
}