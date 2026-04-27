import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageOpen } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import './MyItems.css';

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // In a real app we'd fetch by user ID. Here we'll just fetch all and assume they belong to the user 
    // or fetch a specific set. Since there's no auth, we just fetch all items and treat them as ours for demo.
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/items`);
                setItems(res.data);
            } catch (err) {
                console.error('Error fetching items:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/items/${id}`);
                setItems(items.filter(item => item._id !== id));
            } catch (err) {
                console.error('Error deleting item', err);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/items/${id}`, { status: newStatus });
            setItems(items.map(item => item._id === id ? res.data : item));
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    return (
        <div className="my-items-page container">
            <div className="page-header">
                <h1>My Items</h1>
                <p>Manage the items you've shared with the community.</p>
            </div>

            {loading ? (
                <div className="loading-state">Loading your items...</div>
            ) : (
                <>
                    <div className="items-grid">
                        {items.map(item => (
                            <ItemCard
                                key={item._id}
                                item={item}
                                isOwner={true}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                    {items.length === 0 && (
                        <div className="empty-state">
                            <PackageOpen size={48} className="empty-icon" />
                            <h3>You haven't added any items yet</h3>
                            <p>Start sharing and help build a greener campus!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyItems;
