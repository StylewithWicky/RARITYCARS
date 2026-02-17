import React from 'react';
import { CheckCircle, ArrowRight, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Modal.module.css';

const SuccessModal = ({ isOpen, onClose, productName, category }) => {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.iconWrapper}>
                    <CheckCircle size={60} className={styles.icon} />
                </div>
                <h2 className="font-black uppercase tracking-tighter">Vault_Entry_Confirmed</h2>
                <p className="text-slate-400 text-sm">
                    <strong className="text-white uppercase">{productName}</strong> has been successfully injected into the 
                    <span className={styles.categoryLabel}> {category}</span> sector.
                </p>
                
                <div className={styles.modalActions}>
                    <button 
                        className={styles.secondaryBtn} 
                        onClick={onClose}
                    >
                        <PlusCircle size={18} /> Add_Another
                    </button>
                    
                    <button 
                        className={styles.primaryBtn} 
                        onClick={() => navigate(`/mkuru/fleet`)}
                    >
                        View_Inventory <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;