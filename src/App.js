import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerPortal from './pages/CustomerPortal';
import AgentWorkbench from './pages/AgentWorkbench';
import Dashboard from './pages/Dashboard';
import TrackRequest from './pages/TrackRequest';
import AuditLog from './pages/AuditLog';
import SupervisorView from './pages/SupervisorView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<CustomerPortal />} />
        <Route path="/agent" element={<AgentWorkbench />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/supervisor" element={<SupervisorView />} />
      </Routes>
    </Router>
  );
}

export default App;
