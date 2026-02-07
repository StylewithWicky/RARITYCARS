import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleCard from "./components/VehicleCards";
import VehicleDetail from "./components/VehicleDetails";
import VehicleList from "./components/VehicleList";
import "./App.css";



function App() {
  const [vehicles, setVehicles] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch("http://127.0.0.1:8000/vehicles")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading Rarity Cars...</div>;

  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar">
          <div className="logo">RARITY<span>CARS</span></div>
        </nav>

        <Routes>
          
          <Route path="/" element={<VehicleList vehicles={vehicles} />} />
          <Route path="/vehicles" element={<VehicleList vehicles={vehicles} />} />
          <Route path="/vehicles/:slug" element={<VehicleDetail vehicles={vehicles} />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;