import React, { useState, useEffect } from 'react';
import { X, Calendar, Activity, ShieldAlert } from 'lucide-react';
import styles from '../styles/VehicleDrawer.module.css';

const VehicleDrawer = ({ isOpen, onClose, vehicleId }) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (vehicleId && isOpen) {
      fetch(`/api/mkuru/analytics/vehicle/${vehicleId}/details`)
        .then(res => res.json())
        .then(data => setDetail(data));
    }
  }, [vehicleId, isOpen]);

  return (
    <>
     
      <div 
        className={`drawer-backdrop fixed inset-0 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      
   
      <div className={`drawer-container fixed right-0 top-0 h-full w-full max-w-xl bg-gray-950 border-l border-gray-800 shadow-2xl z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {detail ? (
          <div className="drawer-scroll-area p-10 h-full overflow-y-auto">
            
          
            <div className="flex justify-between items-start mb-12">
              <div>
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-blue-500/10 rounded">
                  Analysis Engine
                </span>
                <h2 className="text-3xl font-bold mt-2 text-white">Vehicle Performance</h2>
              </div>
              <button onClick={onClose} className="p-3 bg-gray-900 rounded-full hover:bg-gray-800 text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="efficiency-card-gradient p-8 rounded-3xl mb-10">
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500 uppercase font-bold text-xs tracking-tight">Revenue Efficiency</p>
                <Activity size={16} className="text-emerald-500" />
              </div>
              <p className="text-5xl font-black text-white">{detail.metrics.revenue_efficiency_pct}%</p>
              <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                Calculated based on paid booking time vs. 24h cleaning windows.
              </p>
            </div>

           
            <h3 className="text-sm font-black uppercase text-gray-500 mb-6 flex items-center gap-2 tracking-widest">
              <Calendar size={14} /> Schedule & Recovery Buffers
            </h3>
            
            <div className="space-y-4 mb-12">
              {detail.calendar.map((event, i) => (
                <div key={i} className={`p-5 rounded-2xl border transition-all ${
                  event.status === 'booked' 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-amber-500/5 border-amber-500/20'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      event.status === 'booked' ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {event.status}
                    </span>
                    <span className="text-gray-600 text-[10px] font-mono font-bold">
                      {event.start}
                    </span>
                  </div>
                  <p className="font-bold text-white mt-1 text-base">{event.title}</p>
                </div>
              ))}
            </div>

           
            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl mb-8">
              <div className="flex gap-4">
                <ShieldAlert className="text-red-500 shrink-0" size={24} />
                <div>
                  <p className="text-white font-bold text-sm">Override Buffer?</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Forcing a booking skips the 24h mandatory detailing window. Use with caution.
                  </p>
                  <button className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl transition-all uppercase text-xs tracking-widest">
                    Proceed with Override
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="parsing-stream text-gray-600 font-mono text-xs uppercase tracking-widest">
              Parsing Data Stream...
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleDrawer;