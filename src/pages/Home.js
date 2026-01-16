import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/SharedComponents';
import { UBA_RED, UBA_WHITE, UBA_GRAY } from '../utils/constants';
import logo from '../image/logo.png';
import homeImage from '../image/home.png';
import {
  Shield,
  Camera,
  FileText,
  Users,
  BarChart3,
  CheckCircle,
  Lock,
  Clock,
  ArrowRight,
  CreditCard,
  UserCheck,
  UserPlus,
  ShieldOff,
  Ban,
  Link,
  Fingerprint,
  Search,
  AlertCircle,
  TrendingUp,
  Edit,
  RefreshCw,
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure Identity Verification',
      description: 'Multi-layer verification with BVN, biometric, and government ID validation',
    },
    {
      icon: Camera,
      title: 'Live Face Capture',
      description: 'Advanced liveness detection and facial recognition against official records',
    },
    {
      icon: FileText,
      title: 'Digital Document Collection',
      description: 'Secure, encrypted document upload with automatic validation checks',
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Typical turnaround time of 24-72 hours with real-time status tracking',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: 'NDPR, GDPR compliant with end-to-end encryption',
    },
    {
      icon: CheckCircle,
      title: 'Instant Validation',
      description: 'Automated verification against government identity databases',
    },
  ];

  const requestTypes = [
    'Account Reactivation',
    'Address Update',
    'Mandate Update',
    'KYC Update',
    'Account Upgrade',
    'Signature Update',
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Navigation Header */}
      <div
        style={{
          backgroundColor: UBA_WHITE,
          borderBottom: '1px solid #e0e0e0',
          padding: '16px 40px',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/"
              style={{
                color: UBA_RED,
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Home
            </a>
            <a
              href="#personal"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Personal
            </a>
            <a
              href="#business"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Business
            </a>
            <a
              href="#corporate"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Corporate
            </a>
            <a
              href="#about"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              About Us
            </a>
            <a
              href="#support"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Support
            </a>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="outline"
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                border: `2px solid ${UBA_RED}`,
                color: UBA_RED,
                backgroundColor: 'transparent',
              }}
            >
              Open an Account
            </Button>
            <Button
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                backgroundColor: UBA_RED,
                color: UBA_WHITE,
              }}
            >
              Internet Banking
            </Button>
          </div>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="UBA Logo"
              style={{ height: '60px', width: 'auto' }}
            />
          </div>
        </div>
      </div>

      {/* Self Service Section */}
      <div style={{ padding: '60px 40px', backgroundColor: UBA_WHITE }}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '60px',
            flexWrap: 'wrap',
          }}
        >
          {/* Text Content */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
              Self Service
            </h2>
            <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
              Banking at your finger tips
            </p>
          </div>

          {/* Image */}
          <div style={{ flex: '1.5', minWidth: '400px', textAlign: 'right' }}>
            <img
              src={homeImage}
              alt="Self Service Banking"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* Manage Your Account Section */}
      <div style={{ padding: '80px 20px', backgroundColor: UBA_GRAY }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
              Manage Your Account with Ease
            </h2>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
              Take control of your finances with our easy-to-use account management features. Whether you're managing your existing account or opening a new one, we've made it quick and secure.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Row 1: 2 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CreditCard size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Register/Activate My Prepaid Card
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Register and activate your prepaid card in a few quick steps
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <UserCheck size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Customer Information Update
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Update your account information - Occupation, Place of Birth, Nationality, etc
              </p>
            </Card>
            </div>

            {/* Row 2: 3 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <UserPlus size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Open an Account
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Open a UBA account instantly to experience banking excellence
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShieldOff size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Block My Card
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Block your card(s) instantly.
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Ban size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Block My Account
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Block your account(s) instantly.
              </p>
            </Card>
            </div>

            {/* Row 3: 3 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Fingerprint size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Link My BVN
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Don't have BVN on your account?
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Link size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Link My NIN
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Don't have NIN on your account?
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Search size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Check a Transaction Status
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Track your transaction status here.
              </p>
            </Card>
            </div>

            {/* Row 4: 3 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <AlertCircle size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Dispute a Transaction
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Log and track failed transactions here.
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <TrendingUp size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Upgrade My Account
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Upgrade your tier 1 accounts to tier 3 to enjoy limitless banking.
              </p>
            </Card>

            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Edit size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Update My Account
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Update your account information (Name, Phone number, Email, Home address).
              </p>
            </Card>
            </div>

            {/* Row 5: 1 card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'calc(33.333% - 16px)' }}>
            <Card enableHover={true}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `${UBA_RED}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <RefreshCw size={24} color={UBA_RED} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
                Reactivate My Account
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                Reactivate your dormant account to explore smart banking choices.
              </p>
            </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          backgroundColor: UBA_RED,
          color: UBA_WHITE,
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            UBA Customer Validation Portal
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.95 }}>
            Complete your validation requests digitally – No branch visit required
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/portal')}
              style={{
                fontSize: '18px',
                padding: '16px 40px',
                backgroundColor: UBA_WHITE,
                color: UBA_RED,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Start Validation
                <ArrowRight size={20} />
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/track-request')}
              style={{
                fontSize: '18px',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: UBA_WHITE,
                border: `2px solid ${UBA_WHITE}`,
              }}
            >
              Track Request
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px', color: '#333' }}>
              Why Choose Digital Validation?
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Fast, secure, and convenient validation from anywhere
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      backgroundColor: `${UBA_RED}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={32} color={UBA_RED} />
                  </div>
                  <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#333' }}>{feature.title}</h3>
                  <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          backgroundColor: UBA_RED,
          color: UBA_WHITE,
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.95 }}>
            Start your validation request now and get it processed within 24-72 hours
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate('/portal')}
            style={{
              fontSize: '18px',
              padding: '16px 40px',
              backgroundColor: UBA_WHITE,
              color: UBA_RED,
            }}
          >
            Start Your Validation
          </Button>
        </div>
      </div>

      {/* Quick Access Section */}
      <div style={{ padding: '60px 20px', backgroundColor: UBA_GRAY }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/portal')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: `${UBA_RED}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={32} color={UBA_RED} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>Customer Portal</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Submit validation request</p>
                </div>
              </div>
            </Card>

            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/agent')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: `${UBA_RED}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Shield size={32} color={UBA_RED} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>Agent Portal</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>CFC agent workbench</p>
                </div>
              </div>
            </Card>

            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: `${UBA_RED}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BarChart3 size={32} color={UBA_RED} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>Dashboard</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Analytics & reports</p>
                </div>
              </div>
            </Card>

            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/audit')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: `${UBA_RED}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Shield size={32} color={UBA_RED} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>Audit Trail</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Compliance & audit logs</p>
                </div>
              </div>
            </Card>

            <Card style={{ cursor: 'pointer' }} onClick={() => navigate('/supervisor')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: `${UBA_RED}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Shield size={32} color={UBA_RED} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>Supervisor Panel</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Escalated cases & overrides</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#333', color: '#fff', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>UBA</div>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>
            United Bank for Africa • Customer Validation Portal
          </div>
          <div style={{ fontSize: '14px', opacity: 0.6 }}>
            © 2026 United Bank for Africa. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
