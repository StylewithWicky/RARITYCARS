import React, { useState, useEffect } from 'react';
import { Upload, Car, DollarSign, ImageIcon, Loader2, Calendar, FileText } from 'lucide-react';
import SuccessModal from './SuccessModal';
import styles from '../styles/ProductUpload.module.css';

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear().toString(),
    category: 'luxury',
    daily_rate: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({ name: '', category: '' });

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setStatus({ type: '', message: '' }); // Clear error if image selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatus({ type: 'error', message: 'IMAGE_REQUIRED: Please select a vehicle image.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Vault_Injection_Protocol_Initiated...' });

    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    dataToSend.append('file', imageFile);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${baseUrl}/api/vehicles/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'VAULT_INJECTION_FAILED');
      }

      const result = await response.json();

      setSuccessData({ 
        name: `${result.brand} ${result.model}`, 
        category: result.category 
      });
      
      setIsModalOpen(true);
      
      // Reset Form State
      setFormData({ brand: '', model: '', year: '2025', category: 'luxury', daily_rate: '', description: '' });
      setImageFile(null);
      setPreview(null);
      setStatus({ type: '', message: '' });

    } catch (error) {
      setStatus({ type: 'error', message: `CRITICAL_ERROR: ${error.message}` });
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <header className={styles.header}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/10 rounded-lg">
            <Upload className="text-gold" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">Asset_Registration</h1>
            <p className="font-mono text-[10px] text-gold/60 uppercase tracking-widest leading-none">
              Mkuru // Security_Clearance_Level_1
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
              <Car size={12} /> Brand
            </label>
            <input 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              placeholder="MERCEDES-BENZ" 
              className="bg-black/40 border border-white/10 rounded p-3 text-white uppercase font-bold text-sm outline-none focus:border-gold/50 transition-colors"
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
              Model
            </label>
            <input 
              name="model" 
              value={formData.model} 
              onChange={handleChange} 
              placeholder="G-WAGON" 
              className="bg-black/40 border border-white/10 rounded p-3 text-white uppercase font-bold text-sm outline-none focus:border-gold/50 transition-colors"
              required 
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
              <Calendar size={12} /> Year
            </label>
            <input 
              name="year" 
              type="number"
              value={formData.year} 
              onChange={handleChange} 
              className="bg-black/40 border border-white/10 rounded p-3 text-white font-mono text-sm outline-none focus:border-gold/50 transition-colors"
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
              <DollarSign size={12} /> Daily Rate (KES)
            </label>
            <input 
              name="daily_rate" 
              type="number" 
              value={formData.daily_rate} 
              onChange={handleChange} 
              placeholder="50,000"
              className="bg-black/40 border border-white/10 rounded p-3 text-gold font-mono text-sm outline-none focus:border-gold/50 transition-colors"
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className="text-[10px] font-mono opacity-50 uppercase mb-2">Category_Tier</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="bg-black/40 border border-white/10 rounded p-3 text-white font-mono text-xs uppercase outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="luxury">Luxury Sedan</option>
            <option value="suv">SUV / 4x4 / Offroad</option>
            <option value="exotic">Exotic / Supercar</option>
            <option value="chauffeur">VVIP Chauffeur Services</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
            <FileText size={12} /> Description
          </label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Specify key features: Panoramic roof, interior leather, performance specs..."
            rows="4"
            className="bg-black/40 border border-white/10 rounded p-3 text-white text-xs outline-none focus:border-gold/50 transition-colors resize-none"
          />
          <div className="text-[9px] text-right mt-1 opacity-40 font-mono">
            CHARS: {formData.description.length}
          </div>
        </div>

        <div className={styles.fileSection}>
          <label className="text-[10px] font-mono opacity-50 uppercase mb-2 flex items-center gap-2">
            <ImageIcon size={12} /> Visual_Data_Asset
          </label>
          <div className="relative group overflow-hidden rounded-lg border-2 border-dashed border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} hidden />
            <label htmlFor="file-input" className="flex flex-col items-center justify-center p-12 cursor-pointer transition-all">
              {preview ? (
                <div className="relative w-full max-w-[400px]">
                  <img src={preview} alt="Preview" className="w-full h-auto rounded shadow-2xl border border-white/20" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="text-[10px] font-black tracking-widest text-white uppercase bg-black/80 px-4 py-2">Change_Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <ImageIcon className="text-white/20 mb-4" size={48} />
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/40">Select_Vehicle_Identity</span>
                </>
              )}
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gold py-4 text-black font-black uppercase tracking-widest text-xs rounded transition-all active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4" 
          disabled={status.type === 'loading'}
        >
          {status.type === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={16} /> 
              Executing_Protocol...
            </>
          ) : 'Inject_To_Inventory'}
        </button>

        {status.message && (
          <div className={`mt-6 p-4 border rounded text-[10px] font-mono text-center uppercase tracking-widest transition-all ${
            status.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-gold/10 border-gold/50 text-gold'
          }`}>
            {status.message}
          </div>
        )}
      </form>

      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productName={successData.name} 
        category={successData.category}
      />
    </div>
  );
};

export default ProductUpload;