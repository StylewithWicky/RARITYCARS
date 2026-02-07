import React from 'react';
import VehicleCard from "./VehicleCards";

const VehicleList = ({ vehicles }) => {
  
  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No vehicles available at the moment.</h2>
      </div>
    );
  }

  return (
    <div className="vehicle-grid">
      {vehicles.map((car) => (
        <VehicleCard key={car.id} vehicle={car} />
      ))}
    </div>
  );
};

export default VehicleList;