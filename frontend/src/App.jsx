import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleCard from "./components/VehicleCards";
import VehicleDetail from "./components/VehicleDetails";
import VehicleList from "./components/VehicleList";
import "./App.css";


const dummyVehicles = [
  { id: 1, name: "Porsche 911", price_per_day: 500, slug: "porsche-911", image_url: "https://via.placeholder.com/300", category: "Luxury", seats: 2, transmission: "Auto" },
  { id: 2, name: "Tesla Model S", price_per_day: 300, slug: "tesla-model-s", image_url: "https://via.placeholder.com/300", category: "Electric", seats: 5, transmission: "Auto" }
];

function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar">
          <div className="logo">RARITY<span>CARS</span></div>
        </nav>

        <Routes>
          
          <Route path="/" element={<VehicleList vehicles={dummyVehicles} />} />
          <Route path="/vehicles" element={<VehicleList vehicles={dummyVehicles} />} />
          
          <Route path="/vehicles/:slug" element={<VehicleDetail vehicles={dummyVehicles} />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;