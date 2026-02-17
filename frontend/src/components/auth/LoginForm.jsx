import { useState } from 'react';
import { User, Lock, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/TwoStepLogin.module.css";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.username) {
      setFormErrors({ username: "Username is required" });
      return;
    }
    setFormErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    
    try {
      const response = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (!response.ok) {
        setGlobalError(data.detail || "Invalid credentials for Rarity Access.");
        setStep(1); 
      } else {
        setSuccessMessage(`Access Granted. Welcome, ${data.username || 'Administrator'}.`);
        
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userRole", data.role || 'admin'); 
        
        setTimeout(() => {
          if (data.role === 'admin') {
            navigate('/mkuru', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }, 1500);
      }
    } catch (error) {
      setGlobalError('The Rarity server is currently unreachable.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={step === 2 ? handleSubmit : handleNext}>
        <div className={styles.brandHeader}>
            <Car className={styles.mainIcon} size={40} />
            <h2 className={styles.title}>Rarity Command Center</h2>
        </div>

        {(globalError || successMessage) && (
          <div className={globalError ? styles.error : styles.successMessage}>
            <p>{globalError || successMessage}</p>
          </div>
        )}

        {step === 1 && (
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <User className={styles.icon} />
              <input
                type="text"
                name="username" 
                placeholder="Admin Username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            {formErrors.username && <p className={styles.errorMessage}>{formErrors.username}</p>}
          </div>
        )}

        {step === 2 && (
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <Lock className={styles.icon} />
              <input
                type="password"
                name="password"
                placeholder="Enter Secure Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        )}

        <div className={styles.buttons}>
          {step > 1 && (
            <button type="button" className={styles.backButton} onClick={handleBack}>
              Back
            </button>
          )}
          <button type="submit" className={styles.button}>
            {step === 2 ? 'Authorize' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}