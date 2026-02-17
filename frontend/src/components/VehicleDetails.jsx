import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Edit, ShieldCheck, Database, Save, 
  XCircle, Trash2, Calendar, Smartphone, Gauge, Users 
} from 'lucide-react';
import SuccessModal from '../Admin/SuccessModal'; 
import '../styles/VehicleDetails.css';

const VehicleDetail = () => {
    const { slug, category } = useParams(); 
    const navigate = useNavigate();
    const location = useLocation();
    
    const [vehicle, setVehicle] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const isMkuru = localStorage.getItem("userRole") === "admin" && 
                    location.pathname.startsWith('/mkuru');

    useEffect(() => {
        const fetchVehicle = async () => {
           
            if (!slug || slug === 'pending') return;
            
            setLoading(true);
            try {
                
                const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
                const targetUrl = `${baseUrl}/api/vehicles/${encodeURIComponent(slug)}`;
                
                console.log("📡 Rarity Engine Pinging:", targetUrl);

                const response = await fetch(targetUrl);
                
                if (!response.ok) {
                    throw new Error(`Vault Error: ${response.status}`);
                }
                
                const data = await response.json();
                
              
                setVehicle(data);
                setFormData(data);
                setError(null);
            } catch (err) {
                console.error("🚨 Vault Connection Failed:", err);
                setError("CRITICAL: UNABLE TO RETRIEVE ASSET DATA FROM VAULT.");
            } finally {
                
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
            const response = await fetch(`${baseUrl}/api/vehicles/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updated = await response.json();
                setVehicle(updated);
                setIsEditing(false);
                setIsModalOpen(true); 
            }
        } catch (err) {
            alert("UPDATE FAILED: ENCRYPTION LINK UNSTABLE.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`PERMANENTLY DE-LIST ${vehicle.brand} ${vehicle.model}?`)) {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
                await fetch(`${baseUrl}/api/vehicles/${slug}`, { method: 'DELETE' });
                navigate('/mkuru/dashboard');
            } catch (err) {
                console.error("DE-LISTING FAILED");
            }
        }
    };

  

    if (loading) return (
        <div className="loader-container">
            <div className="scanner-line"></div>
            <p className="loading-text">INITIALIZING RARITY ENGINE...</p>
        </div>
    );

    if (error || !vehicle) return (
        <div className="error-container" style={{ textAlign: 'center', padding: '100px', background: '#050505', color: 'white' }}>
            <XCircle size={64} color="#00f2ff" />
            <h2 style={{ marginTop: '20px' }}>{error || "ASSET NOT FOUND"}</h2>
            <button 
                onClick={() => navigate(-1)}
                style={{ background: '#00f2ff', color: 'black', border: 'none', padding: '10px 20px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                RETURN TO FLEET
            </button>
        </div>
    );

    return (
        <div className="detail-page">
            <nav className="detail-nav">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={18} /> BACK TO {category?.toUpperCase() || 'FLEET'}
                </button>
            </nav>

            <div className="detail-container">
                
                <div className="gallery-section">
                    <img src={vehicle.image_url} alt={vehicle.model} className="main-img" />
                    {isEditing && (
                        <input 
                            name="image_url" 
                            value={formData.image_url} 
                            onChange={handleChange} 
                            className="edit-input-overlay"
                            placeholder="IMAGE URL"
                        />
                    )}
                </div>

            
                <div className="info-section">
                    <div className="system-tag">PROTOCOL // ASSET_ID_{vehicle.id}</div>
                    
                    {isEditing ? (
                        <div className="edit-group">
                            <input name="brand" value={formData.brand} onChange={handleChange} />
                            <input name="model" value={formData.model} onChange={handleChange} />
                        </div>
                    ) : (
                        <h1 className="vehicle-title">{vehicle.brand} {vehicle.model}</h1>
                    )}

                    <div className="price-tag">
                        {isEditing ? (
                            <input type="number" name="daily_rate" value={formData.daily_rate} onChange={handleChange} />
                        ) : (
                            <p>KES {Number(vehicle.daily_rate).toLocaleString()} <span>/ DAY</span></p>
                        )}
                    </div>

                    <div className="specs-grid">
                        <div className="spec-box">
                            <Calendar size={18} />
                            <span>YEAR: {isEditing ? <input name="year" value={formData.year} onChange={handleChange} /> : vehicle.year}</span>
                        </div>
                        <div className="spec-box">
                            <Users size={18} />
                            <span>SEATS: {vehicle.seats || 5}</span>
                        </div>
                        <div className="spec-box">
                            <Gauge size={18} />
                            <span>DRIVE: {vehicle.transmission || 'AUTO'}</span>
                        </div>
                    </div>

                    <div className="actions">
                        {isMkuru ? (
                            <div className="admin-actions">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSave} className="save-btn"><Save /> COMMIT</button>
                                        <button onClick={() => setIsEditing(false)} className="cancel-btn">CANCEL</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setIsEditing(true)} className="edit-btn"><Edit /> EDIT SPECS</button>
                                        <button onClick={handleDelete} className="delete-btn"><Trash2 /> DELETE</button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <a 
                                href={`https://wa.me/254712345678?text=I%20want%20to%20reserve%20the%20${vehicle.brand}%20${vehicle.model}`} 
                                className="whatsapp-btn"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Smartphone /> BOOK VIA WHATSAPP
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <SuccessModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                productName={`${vehicle.brand} ${vehicle.model}`} 
            />
        </div>
    );
};

export default VehicleDetail;