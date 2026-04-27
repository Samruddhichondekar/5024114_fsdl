import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Recycle, ArrowRight, Sprout, TrendingDown, RefreshCw, Droplets, Lightbulb, Book, HeartHandshake, Wrench } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import './Home.css';

const TIPS = [
    'Carry a reusable water bottle to campus.',
    'Donate textbooks after the semester ends.',
    'Avoid single-use clear plastic bags; use a tote.',
    'Print on both sides of the paper.',
    'Unplug electronics when going to class.',
    'Turn off the lights when leaving your dorm room.',
    'Use a reusable coffee mug at the campus cafe.'
];

const Home = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dailyTip, setDailyTip] = useState('');

    useEffect(() => {
        setDailyTip(TIPS[Math.floor(Math.random() * TIPS.length)]);

        const fetchItems = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/items`);
                const available = res.data.filter(item => item.status === 'Available');
                available.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setFeaturedItems(available.slice(0, 4)); // Show 4 items
            } catch (err) {
                console.error('Error fetching items:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="home-page">
            {/* Awareness Banner */}
            <div className="awareness-banner">
                <div className="container banner-content">
                    <div className="banner-text">
                        <strong>Reuse instead of throwing away 🌍</strong>
                        <span>Small actions can make a big environmental impact</span>
                    </div>
                    <Link to="/browse" className="btn btn-secondary btn-sm banner-btn">
                        Start Sharing <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <section className="hero">
                <div className="container hero-content">
                    <div className="hero-badge">
                        <Recycle size={20} />
                        <span>Join the Student Reuse Movement</span>
                    </div>
                    <h1 className="hero-title">Reduce Waste. <span>Share More.</span> EcoSwap <span role="img" aria-label="leaf">🌿</span></h1>
                    <p className="hero-desc">
                        A sustainable platform designed for college students to share, donate, or exchange reusable items. From textbooks to electronics, let's build a greener campus together.
                    </p>
                    <div className="hero-actions">
                        <Link to="/browse" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>Browse Items</Link>
                        <Link to="/add" className="btn btn-secondary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>Add Item</Link>
                    </div>
                </div>
            </section>

            <section className="featured-section">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="main-feed">
                            <div className="section-header">
                                <h2>Recently Added</h2>
                                <Link to="/browse" className="btn btn-outline">View All</Link>
                            </div>
                            {loading ? (
                                <p className="empty-message">Loading amazing items...</p>
                            ) : (
                                <>
                                    <div className="items-grid">
                                        {featuredItems.map(item => (
                                            <ItemCard key={item._id} item={item} />
                                        ))}
                                    </div>
                                    {featuredItems.length === 0 && (
                                        <p className="empty-message">No items available yet. Be the first to share!</p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="sidebar">
                            <div className="tip-card">
                                <div className="tip-header">
                                    <Lightbulb size={24} color="var(--eco-primary)" />
                                    <h4>Daily Eco Tip</h4>
                                </div>
                                <p className="tip-text">{dailyTip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eco Awareness Section */}
            <section className="awareness-section">
                <div className="container">
                    <div className="awareness-header">
                        <h2>Why Reuse Matters 🌱</h2>
                        <p>Every item shared is a step towards a sustainable future.</p>
                    </div>

                    <div className="awareness-grid">
                        <div className="awareness-card">
                            <TrendingDown size={36} className="awareness-icon" />
                            <h3>Reduces Landfill Waste</h3>
                            <p>By reusing items, we prevent perfectly good products from polluting local landfills.</p>
                        </div>
                        <div className="awareness-card">
                            <Sprout size={36} className="awareness-icon" />
                            <h3>Saves Natural Resources</h3>
                            <p>Manufacturing new items requires water, timber, and minerals. Reusing protects these resources.</p>
                        </div>
                        <div className="awareness-card">
                            <Droplets size={36} className="awareness-icon" />
                            <h3>Reduces Pollution</h3>
                            <p>Less production means lower carbon emissions and a healthier environment for everyone.</p>
                        </div>
                        <div className="awareness-card">
                            <RefreshCw size={36} className="awareness-icon" />
                            <h3>Encourages Sustainability</h3>
                            <p>You become part of a circular economy that values mindful consumption.</p>
                        </div>
                    </div>

                    <div className="Ways-to-reduce">
                        <div className="ways-header">
                            <h3>Simple Ways to Reduce Waste</h3>
                        </div>
                        <ul className="ways-list">
                            <li><Book size={24} /> <span><strong>Reuse books</strong> and study materials</span></li>
                            <li><Droplets size={24} /> <span><strong>Avoid</strong> single-use plastics</span></li>
                            <li><HeartHandshake size={24} /> <span><strong>Share items</strong> with others</span></li>
                            <li><Wrench size={24} /> <span><strong>Repair</strong> instead of replacing</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
