import React from 'react';
import { UBA_RED, UBA_WHITE, UBA_GRAY } from '../utils/constants';

export const Button = ({ children, onClick, variant = 'primary', disabled = false, type = 'button', fullWidth = false }) => {
  const styles = {
    primary: {
      backgroundColor: UBA_RED,
      color: UBA_WHITE,
      border: 'none',
    },
    secondary: {
      backgroundColor: UBA_WHITE,
      color: UBA_RED,
      border: `2px solid ${UBA_RED}`,
    },
    outline: {
      backgroundColor: 'transparent',
      color: UBA_RED,
      border: `1px solid ${UBA_RED}`,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(217, 20, 11, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, title, style = {}, onClick, enableHover = false }) => {
  const handleMouseEnter = enableHover ? (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.border = '2px solid rgba(217, 20, 11, 0.3)';
    e.currentTarget.style.backgroundColor = UBA_GRAY;
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
  } : undefined;

  const handleMouseLeave = enableHover ? (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.border = '2px solid transparent';
    e.currentTarget.style.backgroundColor = UBA_WHITE;
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  } : undefined;

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: UBA_WHITE,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        cursor: onClick ? 'pointer' : 'default',
        border: '2px solid transparent',
        transition: enableHover ? 'all 0.3s ease' : 'none',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title && (
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', fontSize: '20px' }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, error }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
          {label} {required && <span style={{ color: UBA_RED }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: error ? `2px solid ${UBA_RED}` : '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = UBA_RED;
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = '#ddd';
          }
        }}
      />
      {error && (
        <span style={{ color: UBA_RED, fontSize: '14px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export const Select = ({ label, value, onChange, options, required = false }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
          {label} {required && <span style={{ color: UBA_RED }}>*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          fontSize: '16px',
          backgroundColor: UBA_WHITE,
          cursor: 'pointer',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = UBA_RED;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ddd';
        }}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Badge = ({ children, color = 'default' }) => {
  const colors = {
    default: { bg: '#e0e0e0', text: '#333' },
    success: { bg: '#4caf50', text: UBA_WHITE },
    warning: { bg: '#ff9800', text: UBA_WHITE },
    danger: { bg: '#f44336', text: UBA_WHITE },
    info: { bg: '#2196f3', text: UBA_WHITE },
    primary: { bg: UBA_RED, text: UBA_WHITE },
  };

  const style = colors[color] || colors.default;

  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: UBA_WHITE,
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#333' }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const ProgressBar = ({ progress, color = UBA_RED }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};
