import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UBA_RED, UBA_WHITE } from '../utils/constants';
import logo from '../image/logo.png';
import { Home, Users, BarChart3, LogOut, Shield } from 'lucide-react';

const Navbar = ({ userType = 'customer' }) => {
  const navigate = useNavigate();

  const navItems = {
    customer: [
      { label: 'Home', path: '/', icon: Home },
    ],
    agent: [
      { label: 'Dashboard', path: '/agent', icon: Home },
      { label: 'Requests', path: '/agent', icon: Users },
    ],
    supervisor: [
      { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
      { label: 'Supervisor Panel', path: '/supervisor', icon: Shield },
      { label: 'Audit Trail', path: '/audit', icon: Home },
    ],
    manager: [
      { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
      { label: 'Agent Portal', path: '/agent', icon: Users },
      { label: 'Audit Trail', path: '/audit', icon: Home },
    ],
  };

  const items = navItems[userType] || navItems.customer;

  return (
    <nav
      style={{
        backgroundColor: UBA_RED,
        color: UBA_WHITE,
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="UBA Logo" style={{ height: '40px' }} />
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {userType !== 'customer' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: UBA_WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: UBA_RED,
                fontWeight: 'bold',
              }}
            >
              {userType === 'agent' ? 'A' : 'M'}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>
                {userType === 'agent' ? 'CFC Agent' : 'Manager'}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {userType === 'agent' ? 'John Doe' : 'Admin User'}
              </div>
            </div>
          </div>
        )}
        <LogOut
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </div>
    </nav>
  );
};

export default Navbar;
