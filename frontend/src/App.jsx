import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import GuestLayout from './guest/GuestLayout';
import AdminLayout from './Admin/AdminLayout';

// Components
import TawkChat from './components/TawkChat'; // ✅ New Tawk.to Component
import Home from './pages/Home';
import FleetSection from './components/Fleet'; 
import ProductDetails from './components/VehicleDetails'; 
import Login from './components/auth/LoginForm';
import AboutRarity from './components/AboutUs'; 

// Admin Pages
import AdminAnalytics from './Admin/AdminAnalytics';
import ProductUpload from './Admin/ProductUpload';
import AdminFleetList from './Admin/AdminFleet';
import AdminInquiries from './Admin/AdminInquiries'; // ✅ Aligned with your Inbox
import BookingTable from './Admin/BookingTable';

/**
 * Security: Prevents non-admins from accessing the /mkuru portal
 */
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      {/* 💬 Global Live Chat: Lives outside Routes to persist during navigation */}
      <TawkChat />

      <Routes>
        {/* --- 🌍 GUEST ROUTES (PUBLIC) --- */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutRarity />} />
          <Route path="/fleet" element={<FleetSection />} />
          <Route path="/fleet/:category" element={<FleetSection />} /> 
          <Route path="/products/:category/:slug" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
        </Route>

        
        <Route 
          path="/mkuru" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard & Data */}
          <Route index element={<AdminAnalytics />} /> 
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="bookings" element={<BookingTable />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          
          {/* Fleet Management */}
          <Route path="fleet" element={<AdminFleetList />} />
          <Route path="upload" element={<ProductUpload />} />
          <Route path="products/:category/:slug" element={<ProductDetails />} />
          
          {/* System */}
          <Route path="audit-logs" element={<div className="p-8 text-white font-mono">System Audit Logs</div>} />
          <Route path="settings" element={<div className="p-8 text-white font-mono">Global Fleet Settings</div>} />
        </Route>

        {/* --- REDIRECTS & 404s --- */}
        <Route path="/admin/*" element={<Navigate to="/mkuru" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;